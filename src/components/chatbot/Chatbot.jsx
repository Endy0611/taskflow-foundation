import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react"; // Import Lucide icons

const TaskFlowChatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello, I’m TaskFlowBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages([...messages, { type: "user", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let botResponse = "";

      if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
        botResponse = "Hi there! How are you today?";
      } else if (lowerMsg.includes("create") && lowerMsg.includes("task")) {
        botResponse =
          "To create a task: Go to your workspace → choose a project → click ‘+ Add Task’. You can set the title, deadline, and assignee.";
      } else if (lowerMsg.includes("workspace")) {
        botResponse =
          "A workspace is your main hub in TaskFlow. Create one from the dashboard, name it, and invite your teammates.";
      } else if (lowerMsg.includes("project")) {
        botResponse =
          "A project lives inside a workspace. Think of a workspace like your office, and projects like folders inside it.";
      } else if (lowerMsg.includes("guest")) {
        botResponse =
          "Guest users can explore TaskFlow, but they cannot add tasks or manage projects. To unlock all features, please register an account.";
      } else if (lowerMsg.includes("account") || lowerMsg.includes("login")) {
        botResponse =
          "You can register for free. If you forget your password, click ‘Forgot Password’ on the login page.";
      } else if (lowerMsg.includes("assign") && lowerMsg.includes("task")) {
        botResponse =
          "Yes, you can assign tasks to teammates by editing the task and selecting ‘Assign To’.";
      } else if (lowerMsg.includes("priority")) {
        botResponse =
          "Tasks can be marked as High, Medium, or Low priority so you can focus on what matters most.";
      } else if (lowerMsg.includes("notification") || lowerMsg.includes("reminder")) {
        botResponse =
          "TaskFlow will remind you about deadlines via app notifications. You can also enable email reminders in settings.";
      } else if (lowerMsg.includes("help") || lowerMsg.includes("support")) {
        botResponse =
          "I can help with tasks, workspaces, accounts. For technical issues, please contact our support team.";
      } else {
        botResponse =
          "Sorry, I didn’t catch that. Try asking about tasks, workspaces, or accounts. Thank you!";
      }

      setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-orange-400" />
            <span className="font-semibold">TaskFlowBot</span>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <button className="text-white text-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat messages (fixed height with scroll) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4" id="chat">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <div className="p-2 border-t border-gray-300 flex items-center space-x-2 bg-blue-500">
          <input
            type="text"
            placeholder="Text your message..."
            className="flex-1 p-2 border-none text-amber-50 rounded-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className=" text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFlowChatbot;
