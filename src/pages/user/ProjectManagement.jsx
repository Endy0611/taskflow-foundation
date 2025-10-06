// ProjectManagement.jsx
import React, { useState, useEffect } from "react";
import { Menu, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { ShareBoardComponent } from "../../components/task/ShareBoardComponent";

export default function ProjectManagement() {
  const [lists, setLists] = useState([
    { id: "list-1", title: "TaskFlow", cards: [] },
    {
      id: "list-2",
      title: "Project Resources",
      cards: [
        {
          id: "card-1",
          text: 'Project "Teamwork Dream Work"\nLaunch Timeline',
        },
        {
          id: "card-2",
          text: 'Project "Teamwork Dream Work"\nLaunch Timeline',
        },
      ],
    },
    {
      id: "list-3",
      title: "To Do",
      cards: [
        {
          id: "card-3",
          text: 'Project "Teamwork Dream Work"\nLaunch Timeline',
        },
        {
          id: "card-4",
          text: 'Project "Teamwork Dream Work"\nLaunch Timeline',
        },
        {
          id: "card-5",
          text: 'Project "Teamwork Dream Work"\nLaunch Timeline',
        },
      ],
    },
    {
      id: "list-4",
      title: "Done",
      cards: [
        {
          id: "card-6",
          text: "✅ Finalize Campaign Name :\nLaunch Timeline\n📅 Jan 10, 2025",
        },
        {
          id: "card-7",
          text: "✅ Finalize Campaign Name :\nLaunch Timeline\n📅 Jan 10, 2025",
        },
      ],
    },
  ]);

  // Sidebar + chatbot states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Add list + card states
  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [activeListForCard, setActiveListForCard] = useState(null);
  const [newCardText, setNewCardText] = useState("");

  // Share modal
  const [showShare, setShowShare] = useState(false);

  /** ====== Drag & Drop ====== */
  const onDragStart = (e, fromListId, cardId) => {
    e.dataTransfer.setData("fromListId", fromListId);
    e.dataTransfer.setData("cardId", cardId);
  };

  const onDrop = (e, toListId) => {
    const fromListId = e.dataTransfer.getData("fromListId");
    const cardId = e.dataTransfer.getData("cardId");
    if (!fromListId || !cardId || fromListId === toListId) return;

    const newLists = [...lists];
    const fromList = newLists.find((l) => l.id === fromListId);
    const toList = newLists.find((l) => l.id === toListId);

    const cardIndex = fromList.cards.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    const [movedCard] = fromList.cards.splice(cardIndex, 1);
    toList.cards.push(movedCard);

    setLists(newLists);
  };

  /** ====== Create list ====== */
  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList = { id: `list-${Date.now()}`, title: newListName, cards: [] };
    setLists([...lists, newList]);
    setNewListName("");
    setShowAddList(false);
  };

  /** ====== Add card ====== */
  const handleAddCard = (listId) => {
    if (!newCardText.trim()) return;
    const newLists = [...lists];
    const list = newLists.find((l) => l.id === listId);
    list.cards.push({ id: `card-${Date.now()}`, text: newCardText });
    setLists(newLists);
    setNewCardText("");
    setActiveListForCard(null);
  };

  // Reset sidebar when resizing
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setSidebarOpen(false);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
          {/* Hamburger visible only on mobile */}
            <button
              className="md:hidden p-2 -ml-2 rounded hover:bg-blue-600"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <Menu className="w-6 h-6" />
            </button>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-highlight dark:bg-gray-800">
            <h1 className="text-lg font-semibold">TaskFlow</h1>
            <button
              onClick={() => setShowShare(true)}
              className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
            >
              Share
            </button>
          </div>

          {/* Kanban Board */}
          <div className="flex flex-wrap gap-4 p-6">
            {lists.map((list) => (
              <div
                key={list.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, list.id)}
                className="bg-highlight dark:bg-gray-800 rounded-lg p-3 w-64"
              >
                {/* List header */}
                <div className="flex items-center justify-between mb-2 text-black dark:text-gray-200">
                  <h2 className="font-medium">{list.title}</h2>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {list.cards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, list.id, card.id)}
                      className="bg-white dark:bg-gray-700 rounded-md shadow px-3 py-2 text-sm whitespace-pre-line cursor-grab active:cursor-grabbing dark:text-gray-100"
                    >
                      {card.text}
                    </div>
                  ))}
                </div>

                {/* Add card */}
                {activeListForCard === list.id ? (
                  <div className="mt-2">
                    <textarea
                      value={newCardText}
                      onChange={(e) => setNewCardText(e.target.value)}
                      className="w-full focus:outline-none rounded px-2 py-1 text-sm mb-2 bg-white dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter card title..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddCard(list.id)}
                        className="px-2 py-1 bg-green-700 text-white text-xs rounded"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setActiveListForCard(null);
                          setNewCardText("");
                        }}
                        className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-xs rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveListForCard(list.id)}
                    className="text-xs text-white mt-2 hover:underline bg-primary p-2 rounded dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    + Add Card
                  </button>
                )}
              </div>
            ))}

            {/* Add List */}
            <div className="w-64">
              {showAddList ? (
                <div className="bg-highlight dark:bg-gray-800 p-3 rounded-lg shadow">
                  <p className="text-center font-semibold pb-2">Create List</p>
                  <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="List name"
                    className="w-full border dark:border-gray-600 rounded px-2 py-1 mb-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateList}
                      className="px-2 py-1 bg-green-700 text-white text-xs rounded"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddList(false)}
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 text-xs rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddList(true)}
                  className="bg-highlight text-black dark:text-gray-200 dark:bg-gray-800 px-4 py-3 w-full rounded-lg flex items-center justify-center hover:bg-teal-300 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Add List</span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Floating chatbot button */}
      <img
        src="/src/assets/general/chatbot.png"
        alt="Our Chatbot"
        className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 rounded-full shadow-lg cursor-pointer bg-white"
        onClick={() => setShowChatbot(true)}
      />

      {/* Share Modal */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <ShareBoardComponent onClose={() => setShowShare(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatbot(false)}
            />
            <motion.div
              className="fixed bottom-24 right-8 z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskFlowChatbot onClose={() => setShowChatbot(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
