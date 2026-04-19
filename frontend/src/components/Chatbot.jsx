import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";
import { MessageSquare, X, Send } from "lucide-react";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

function formatText(text) {
  let cleanText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  cleanText = cleanText.replace(
    /```([\s\S]*?)```/g,
    "<pre><code>$1</code></pre>",
  );
  cleanText = cleanText.replace(/`([^`]+)`/g, "<code>$1</code>");

  const parts = cleanText.split(/(<pre><code>[\s\S]*?<\/code><\/pre>)/);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith("<pre>")) {
      parts[i] = parts[i].replace(/\n/g, "<br>");
      parts[i] = parts[i].replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    }
  }
  return parts.join("");
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful and knowledgeable medical AI assistant. You may provide general health, wellness, and medical information. However, you must always remind the user that you are an AI, not a certified doctor, and that they must consult a healthcare professional before acting on any medical information you provide.",
    },
    {
      role: "assistant",
      content:
        "Hello! I am your BloodConnect Support. How can I assist you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role === "donor") {
        fetch("https://blood-bank-urer.onrender.com/api/donor/profile", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          const donorData = data.donor || data;
          let dynamicPrompt = "You are BloodConnect Support, a helpful and knowledgeable medical AI assistant. You may provide general health, wellness, and medical information. However, you must always remind the user that you are an AI, not a certified doctor, and that they must consult a healthcare professional before acting on any medical information you provide.\n\n";

          dynamicPrompt += `Current Logged-In User Information:
- Name: ${donorData.name || "User"}
- Role: Donor
- Blood Type: ${donorData.bloodGroup || "Unknown"}
- Eligible to Donate: ${donorData.eligibleToDonate ? "Yes" : "No"}
- Next Eligible Date: ${donorData.nextEligibleDate ? new Date(donorData.nextEligibleDate).toLocaleDateString() : "N/A"}
- Last Donation Date: ${donorData.lastDonationDate ? new Date(donorData.lastDonationDate).toLocaleDateString() : "N/A"}
- Total Donations: ${donorData.totalDonations || 0}\n\n`;

          dynamicPrompt += `Important Instructions:
1. Do not list or expose the user's details proactively. Keep them hidden and only use them if the user specifically asks a related question (e.g., "Am I eligible to donate?", "What's my blood type?").
2. If the user says "hi", "hello", or offers a simple greeting, respond strictly with a short, personalized greeting like "Hi ${donorData.name || "there"}! What can I do for you today?". Do not provide any other details in that initial response.`;

          setMessages(prev => {
            const newMessages = [...prev];
            // Update the system message which is always the first one
            if (newMessages[0].role === "system") {
              newMessages[0].content = dynamicPrompt;
            }
            return newMessages;
          });
        })
        .catch(err => console.error("Error fetching donor profile for chatbot:", err));
      }
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleInput = (e) => {
    setInputMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const text = inputMessage.trim();
    if (!text) return;

    if (!API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Chatbot is not configured yet. Add `VITE_GROQ_API_KEY` to the frontend environment before using it.",
        },
      ]);
      return;
    }

    setInputMessage("");
    const inputEl = document.getElementById("cb-user-input");
    if (inputEl) {
      inputEl.style.height = "auto";
    }

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: newMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            temperature: 0.7,
            max_tokens: 1024,
            stream: true,
          }),
        },
      );

      if (!response.ok) {
        setIsTyping(false);
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${errorData.error?.message || "Something went wrong while connecting to Groq."}`,
          },
        ]);
        return;
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split("\n");
        buffer = lines.pop();

        for (let line of lines) {
          line = line.trim();
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices[0]?.delta?.content || "";
              botReply += content;

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = botReply;
                return updated;
              });
            } catch (err) {
              console.error("Stream parse error on chunk:", line, err);
            }
          }
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please check your connection to Groq API.",
        },
      ]);
    }
  };

  return (
    <motion.div className="chatbot-widget-container" drag dragMomentum={false}>
      {/* Toggler Button */}
      <button
        className="chatbot-toggler"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      <div className={`cb-wrapper ${isOpen ? "open" : ""}`}>
        <div className="cb-orb cb-orb-1"></div>
        <div className="cb-orb cb-orb-2"></div>

        <div className="cb-chat-inner">
          <header className="cb-chat-header">
            <div className="cb-header-left">
              <div className="cb-bot-avatar">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="cb-bot-info">
                <h1>Groq AI Bot</h1>
                <span className="cb-status">
                  <span className="cb-status-dot"></span>
                  Online
                </span>
              </div>
            </div>
          </header>

          <div className="cb-chat-messages">
            {messages.map((msg, index) => {
              if (msg.role === "system") return null;
              return (
                <div
                  key={index}
                  className={`cb-message ${msg.role === "user" ? "cb-user-message" : "cb-bot-message"}`}
                >
                  <div
                    className="cb-message-content"
                    dangerouslySetInnerHTML={{
                      __html: formatText(msg.content),
                    }}
                  />
                </div>
              );
            })}

            {isTyping && (
              <div className="cb-message cb-bot-message">
                <div className="cb-message-content cb-typing-indicator">
                  <div className="cb-typing-dot"></div>
                  <div className="cb-typing-dot"></div>
                  <div className="cb-typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="cb-chat-form">
            <div className="cb-input-wrapper">
              <textarea
                id="cb-user-input"
                value={inputMessage}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows="1"
              />
              <button
                className="cb-send-btn"
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
