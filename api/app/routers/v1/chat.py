from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatCreate, ChatUpdate, ChatOut
from app.crud.chat import create_chat, update_chat, soft_delete_chat, get_all_chats, get_chat
from app.dependencies.db import SessionDep, UserDep
from app.schemas.message import MessageOut, MessageCreate
from app.crud.message import get_all_messages, create_message
from app.utils.llm import create_llm_response


chat_router = APIRouter(prefix="/chat")

@chat_router.post("/", response_model=ChatOut)
def create_chat_api(chat_in: ChatCreate, session: SessionDep, user: UserDep) -> ChatOut:
    chat = create_chat(chat_in, session, user)
    chat_out = ChatOut.model_validate(chat)
    # Create user message
    user_message = create_message(MessageCreate(chat_id=chat.id, content=chat_in.content, role="user"), session)
    chat_out.messages.append(MessageOut.model_validate(user_message))

    # Generate LLM response content
    llm_response_content = create_llm_response([user_message])
    # Create assistant message
    assistant_message = create_message(MessageCreate(chat_id=chat.id, content=llm_response_content, role="assistant"), session)
    chat_out.messages.append(MessageOut.model_validate(assistant_message))
    return chat_out

@chat_router.post("/message", response_model=list[MessageOut])
def create_chat_message_api(message_in: MessageCreate, session: SessionDep, user: UserDep) -> list[MessageOut]:
    messages = get_all_messages(message_in.chat_id, session)

    # Create user message
    user_message = create_message(message_in, session)
    messages.append(user_message)
    # Generate LLM response content
    llm_response_content = create_llm_response(messages)
    # Create assistant message
    assistant_message = create_message(MessageCreate(chat_id=message_in.chat_id, content=llm_response_content, role="assistant"), session)
    return [user_message, assistant_message]


@chat_router.put("/{chat_id}", response_model=ChatOut)
def update_chat_api(chat_id: int, chat_in: ChatUpdate, session: SessionDep, user: UserDep) -> ChatOut:
    chat = update_chat(chat_id, chat_in, session, user)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@chat_router.delete("/{chat_id}", response_model=ChatOut)
def delete_chat_api(chat_id: int, session: SessionDep, user: UserDep) -> ChatOut:
    chat = soft_delete_chat(chat_id, session, user)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@chat_router.get("/", response_model=list[ChatOut])
def get_all_chats_api(session: SessionDep, user: UserDep) -> list[ChatOut]:
    chats = get_all_chats(session, user)
    result = []
    for chat in chats:
        messages = get_all_messages(chat.id, session)
        chat_out = ChatOut.model_validate(chat)
        chat_out_dict = chat_out.model_dump()
        chat_out_dict["messages"] = [MessageOut.model_validate(m) for m in messages]
        result.append(chat_out_dict)
    return result

@chat_router.get("/{chat_id}", response_model=ChatOut)
def get_chat_api(chat_id: int, session: SessionDep, user: UserDep) -> ChatOut:
    chat = get_chat(chat_id, session, user)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    messages = get_all_messages(chat_id, session)
    chat_out = ChatOut.model_validate(chat)
    chat_out.messages = [MessageOut.model_validate(m) for m in messages]
    return chat_out
