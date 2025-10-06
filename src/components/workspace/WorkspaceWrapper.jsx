// components/layout/WorkspaceWrapper.jsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../sidebar/SidebarComponent";
import TaskFlowChatbot from "../chatbot/Chatbot";
import WorkspaceModal from "../modals/WorkspaceModal";

export default function WorkspaceWrapper({ 
  children, 
  sidebarComponent: SidebarComp = SidebarComponent,
  className = "bg-gray-100 dark:bg-gray-950"
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setSidebarOpen(false);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <SidebarComp
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

        <main className={`flex-1 overflow-y-auto p-6 md:p-10 ${className}`}>
          {children}
        </main>
      </div>

      <ChatbotOverlay 
        showChatbot={showChatbot} 
        setShowChatbot={setShowChatbot} 
      />
      
      <WorkspaceModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
      />
    </div>
  );
}