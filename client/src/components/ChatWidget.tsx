import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const welcomeMessage =
  "👋 Welcome to Logisti Core! How can we assist you today?";

function getBotReply(userMsg: string): string {
  // Simple rule-based replies (you can replace with AI/chatbot API)
  const msg = userMsg.toLowerCase();
  if (
    msg.includes("track") ||
    msg.includes("tracking") ||
    msg.includes("parcel status")
  ) {
    return "📦 To track your parcel, please visit the tracking page or provide your tracking number.";
  }
  if (msg.includes("price") || msg.includes("charge")) {
    return "💸 Our charges depend on parcel weight, service type, and destination. You can get an estimate on the pricing page.";
  }
  if (
    msg.includes("register") ||
    msg.includes("sign up") ||
    msg.includes("create account")
  ) {
    return "📝 You can register quickly by clicking the 'Get Started' or 'Register' button on our homepage.";
  }
  if (msg.includes("contact") || msg.includes("help") || msg.includes("support")) {
    return "☎️ You can contact our support team via email (support@logisticore.com) or call +88 01234 567 89.";
  }
  if (
    msg.includes("delivery time") ||
    msg.includes("how long") ||
    msg.includes("duration")
  ) {
    return "⏰ Delivery times depend on your chosen service and destination, usually 1-5 days for domestic parcels.";
  }
  if (msg.includes("hello") || msg.includes("hi")) {
    return "👋 Hi! How can I help you?";
  }
  return "🤖 Thank you for your message! We'll get back to you soon, or you can check our FAQ.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show welcome message when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ sender: "bot", text: welcomeMessage }]);
    }
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Scroll to bottom when new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: getBotReply(userMsg) },
      ]);
    }, 600); // Simulate bot delay
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat Icon (fixed right bottom) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <Button
            size="icon"
            className="rounded-full w-16 h-16 shadow-lg bg-gradient-to-br from-orange-500 to-blue-500 text-white hover:scale-105 transition-all"
            aria-label="Open chat"
            onClick={() => setOpen(true)}
          >
            {/* Icon size changed from w-6 h-6 to w-14 h-14 */}
            <FaComments className="w-14 h-14" />
          </Button>
        )}
      </div>
      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[96vw] bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-orange-100 dark:border-orange-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-orange-100 dark:border-orange-900 bg-gradient-to-r from-orange-100 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-t-xl">
            <span className="font-bold text-orange-700 dark:text-orange-300 flex items-center gap-2">
              {/* Icon size changed from default to w-7 h-7 */}
              <FaComments className="w-7 h-7" /> Chat Support
            </span>
            <button
              className="text-2xl text-gray-500 hover:text-orange-500 transition"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              {/* Icon size changed from text-xl to text-3xl */}
              <IoMdClose className="w-7 h-7" />
            </button>
          </div>
          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-white dark:bg-gray-950"
            style={{ minHeight: "180px", maxHeight: "260px" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] whitespace-pre-line
                  ${
                    msg.sender === "bot"
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <div className="px-4 py-3 border-t border-orange-100 dark:border-orange-900 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-b-xl">
            <div className="flex gap-2 items-center">
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1"
                autoFocus
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                aria-label="Send"
              >
                {/* Icon size changed from w-4 h-4 to w-7 h-7 */}
                <FaPaperPlane className="w-7 h-7" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}