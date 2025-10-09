import React, { useState, useEffect } from "react";
import { Menu, Plus, Ellipsis } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { ShareBoardComponent } from "../../components/task/ShareBoardComponent";
import TaskDetailComponent from "../../components/task/TaskDetailComponent"; // ✅ import this

export default function ProjectManagement() {
  const [lists, setLists] = useState([
    { id: "list-1", title: "TaskFlow", cards: [], showMenu: false, isEditing: false },
    {
      id: "list-2",
      title: "Project Resources",
      showMenu: false,
      isEditing: false,
      cards: [
        { id: "card-1", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-2", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
      ],
    },
    {
      id: "list-3",
      title: "To Do",
      showMenu: false,
      isEditing: false,
      cards: [
        { id: "card-3", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-4", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-5", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
      ],
    },
    {
      id: "list-4",
      title: "Done",
      showMenu: false,
      isEditing: false,
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

  // ✅ Task Detail modal
  const [selectedCard, setSelectedCard] = useState(null);

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
    const newList = {
      id: `list-${Date.now()}`,
      title: newListName,
      cards: [],
      showMenu: false,
      isEditing: false,
    };
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
          className="fixed top inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {/* Full-width Top Bar */}
          <div className="w-full bg-highlight dark:bg-gray-800">
            <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
              <h1 className="text-lg font-semibold text-gray-700">TaskFlow</h1>
              <button
                onClick={() => setShowShare(true)}
                className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Share
              </button>
            </div>
          </div>

          {/* Hamburger BELOW Top Bar (mobile only) */}
          <div className="md:hidden flex justify-start px-6 py-2 bg-white dark:bg-gray-900 mt-4 w-full">
            <button
              className="p-2 rounded-md bg-primary text-white hover:bg-blue-900 transition-colors"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Kanban Board */}
          <div className="flex flex-wrap gap-4 p-6 justify-center md:justify-start">
            {lists.map((list) => (
              <div
                key={list.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, list.id)}
                className="bg-highlight dark:bg-gray-800 rounded-lg p-3 w-64 relative"
              >
                {/* ===== List Header ===== */}
                <div className="flex items-center justify-between mb-2 text-black">
                  {list.isEditing ? (
                    <input
                      type="text"
                      value={list.title}
                      onChange={(e) =>
                        setLists((prev) =>
                          prev.map((l) =>
                            l.id === list.id ? { ...l, title: e.target.value } : l
                          )
                        )
                      }
                      onBlur={() =>
                        setLists((prev) =>
                          prev.map((l) =>
                            l.id === list.id ? { ...l, isEditing: false } : l
                          )
                        )
                      }
                      autoFocus
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    <h2 className="font-medium truncate">{list.title}</h2>
                  )}

                  {/* ===== Ellipsis Menu ===== */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setLists((prev) =>
                          prev.map((l) =>
                            l.id === list.id
                              ? { ...l, showMenu: !l.showMenu }
                              : { ...l, showMenu: false }
                          )
                        )
                      }
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Ellipsis className="w-5 h-5" />
                    </button>

                    {list.showMenu && (
                      <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-700 rounded shadow-md z-10">
                        <button
                          onClick={() =>
                            setLists((prev) =>
                              prev.map((l) =>
                                l.id === list.id
                                  ? { ...l, isEditing: true, showMenu: false }
                                  : l
                              )
                            )
                          }
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setLists((prev) => prev.filter((l) => l.id !== list.id))
                          }
                          className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ===== Cards ===== */}
                <div className="flex flex-col gap-2">
                  {list.cards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, list.id, card.id)}
                      onClick={() => setSelectedCard(card)}
                      className="bg-white dark:bg-gray-700 rounded-md shadow px-3 py-2 text-sm whitespace-pre-line cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 active:cursor-grabbing dark:text-gray-100"
                    >
                      {card.text}
                    </div>
                  ))}
                </div>

                {/* ===== Add Card ===== */}
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
                    className="text-xs text-white mt-2 bg-primary p-2 rounded dark:bg-purple-600 dark:hover:bg-purple-700"
                  >
                    + Add Card
                  </button>
                )}
              </div>
            ))}

            {/* ===== Add List ===== */}
            <div className="w-64">
              {showAddList ? (
                <div className="bg-highlight dark:bg-gray-800 p-3 rounded-lg shadow">
                  <p className="text-center text-black font-semibold pb-2">Create List</p>
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
                  className="bg-highlight text-primary dark:bg-gray-800 px-4 py-3 w-full rounded-lg flex items-center justify-center hover:bg-teal-300 dark:hover:bg-gray-700"
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

      {/* ✅ Task Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <TaskDetailComponent
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
                onDeleteCard={(cardId) => {
                  setLists((prevLists) =>
                    prevLists.map((list) => ({
                      ...list,
                      cards: list.cards.filter((c) => c.id !== cardId),
                    }))
                  );
                  setSelectedCard(null);
                }}
              />
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
