import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { Send } from 'lucide-react';
import type { Chat, Message } from '@/app/[locale]/types';
import { fetcher } from '@/util/fetcher';


function formatTime(ts: string) {
  const date = new Date(ts);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toLocaleTimeString([]);
}

export default function ChatContentPage({ chat, taskPanelOpen = true }: { chat: Chat, taskPanelOpen?: boolean }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex flex-row w-full h-full min-h-0">
      {/* 左侧对话区 */}
      <div className={`flex flex-col ${taskPanelOpen ? 'flex-[2_2_0%]' : 'flex-1'} h-full min-h-0 bg-white rounded-l p-0 transition-all duration-300`}>
        {/* 历史消息可滚动 */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <Image
                  src="/logo.svg"
                  alt="助手"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full mr-2 self-end"
                />
              )}
              <div className="flex flex-col items-end max-w-[80%]">
                <div
                  className={`px-4 py-2 rounded-lg break-words shadow ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-200 text-gray-900 self-start'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-xs text-gray-400 mt-1 self-end">{formatTime(msg.created_at!)}</span>
              </div>
              {msg.role === 'user' && (
                <Image
                  src="/user.svg"
                  alt="用户"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full ml-2 self-end"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* 底部输入区固定 */}
        <div className="px-4 py-3 border-t bg-white sticky bottom-0 z-10">
          <div className="flex w-full gap-2">
            <input
              className="flex-1 border rounded px-2 py-2 h-10"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="请输入你的问题..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => {
                const content = input.trim();
                const now = new Date().toUTCString().slice(0, 25);
                setMessages([...messages, { id: 0, content, role: 'user', created_at: now, updated_at: now }]);
                setInput('');
                if (content) {
                  fetcher('/chat/message', {
                    method: 'POST',
                    auth: true,
                    body: JSON.stringify({ content, chat_id: chat.id, role: 'user' }),
                    headers: { 'Content-Type': 'application/json' }
                  }).then(res => {
                    const data = res as Message[];
                    setMessages([...messages, ...data]);
                  });
                }
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {/* 右侧任务执行区，可展开/收起 */}
      <div className={`relative flex flex-col ${taskPanelOpen ? 'flex-[1_1_0%] max-w-xl' : 'w-0 min-w-0 p-0 border-0'} h-full min-h-0 bg-gray-50 rounded-r border-l border-gray-200 transition-all duration-300`}> 
        {taskPanelOpen ? (
          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <div className="text-lg font-bold mb-4">任务执行过程与结果</div>
            <div className="text-gray-500">这里展示任务执行的详细过程和最终结果。</div>
          </div>
        ) : null}
      </div>
    </div>
  );
} 