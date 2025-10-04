"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from "react-icons/fa";
import api from "@/utils/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from session storage on component mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatbot-messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map(
          (msg: Message & { timestamp: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })
        );
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error loading messages from session storage:", error);
      }
    } else {
      // Welcome message
      const welcomeMessage: Message = {
        id: "welcome",
        text: "Hello! I'm your NASA Terra satellite assistant. Ask me anything about Terra's instruments, missions, or Earth observation data!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to session storage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("chatbot-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/message", {
        message: inputMessage,
      });

      const botResponseText = response.data;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: "welcome-new",
      text: "Chat cleared! How can I help you learn about NASA's Terra satellite?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    sessionStorage.removeItem("chatbot-messages");
  };

  return (
    <>
      {/* Chat Bot Icon */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? (
              <FaTimes className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            ) : (
              <FaRobot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            )}
          </div>

          {/* Notification dot when closed and has messages */}
          {!isOpen && messages.length > 1 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[calc(100vw-1rem)] sm:w-96 max-w-md h-[70vh] sm:h-[32rem] z-50">
          <div
            className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl border border-white/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(59,130,246,0.1) 100%)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-white/10 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaRobot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm">
                      Terra Assistant
                    </h3>
                    <p className="text-gray-300 text-xs hidden sm:block">
                      NASA Earth Observation Expert
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={clearChat}
                    className="text-gray-400 hover:text-white text-xs px-1 sm:px-2 py-1 rounded hover:bg-white/10 transition-colors duration-200"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                  >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 h-80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-white/10 border border-white/20 text-gray-100"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/20 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center gap-2">
                      <FaSpinner className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-spin" />
                      <span className="text-xs sm:text-sm text-gray-300">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Terra satellite..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all duration-200 text-xs sm:text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                >
                  <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
