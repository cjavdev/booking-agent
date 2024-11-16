"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
    initialMessages: [
      {
        role: "assistant",
        content: "How can we help, today?",
      },
    ],
  })

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-2/3 h-full flex flex-col border rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Garage Door Service</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Book your repair appointment</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages
          .filter(message => message.content)
          .map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-amber-500 text-white"
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="I'd like to book an appointment..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            className="flex-1 border rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
          />
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors" >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
