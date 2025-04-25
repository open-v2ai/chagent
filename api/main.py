import os

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI()

class Message(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/chat")
def chat(message: Message):
    return {"message": message.message}

if __name__ == "__main__":
    uvicorn.run(app, host=os.getenv("API_HOST", "0.0.0.0"), port=int(os.getenv("API_PORT", 8000)))