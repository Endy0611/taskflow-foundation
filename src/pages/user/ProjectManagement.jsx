// ProjectManagement.jsx
import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function ProjectManagement() {
  const [lists, setLists] = useState([
    { id: "list-1", title: "TaskFlow", cards: [] },
    {
      id: "list-2",
      title: "Project Resources",
      cards: [
        { id: "card-1", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-2", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
      ],
    },
    {
      id: "list-3",
      title: "To Do",
      cards: [
        { id: "card-3", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-4", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
        { id: "card-5", text: 'Project "Teamwork Dream Work"\nLaunch Timeline' },
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

  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState("");

  // === Card add states ===
  const [activeListForCard, setActiveListForCard] = useState(null);
  const [newCardText, setNewCardText] = useState("");

  /** ====== DRAG & DROP ====== */
  const onDragStart = (e, fromListId, cardId) => {
    e.dataTransfer.setData("fromListId", fromListId);
    e.dataTransfer.setData("cardId", cardId);
  };

  const onDrop = (e, toListId) => {
    const fromListId = e.dataTransfer.getData("fromListId");
    const cardId = e.dataTransfer.getData("cardId");
    if (!fromListId || !cardId) return;

    if (fromListId === toListId) return;

    const newLists = [...lists];
    const fromList = newLists.find((l) => l.id === fromListId);
    const toList = newLists.find((l) => l.id === toListId);

    const cardIndex = fromList.cards.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    const [movedCard] = fromList.cards.splice(cardIndex, 1);
    toList.cards.push(movedCard);

    setLists(newLists);
  };

  /** ====== CREATE LIST ====== */
  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList = {
      id: `list-${Date.now()}`,
      title: newListName,
      cards: [],
    };
    setLists([...lists, newList]);
    setNewListName("");
    setShowAddList(false);
  };

  /** ====== ADD CARD ====== */
  const handleAddCard = (listId) => {
    if (!newCardText.trim()) return;
    const newLists = [...lists];
    const list = newLists.find((l) => l.id === listId);
    list.cards.push({ id: `card-${Date.now()}`, text: newCardText });
    setLists(newLists);
    setNewCardText("");
    setActiveListForCard(null);
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-teal-200">
        <h1 className="text-lg font-semibold">TaskFlow</h1>
        <button className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700">
          Share
        </button>
      </div>

      {/* Kanban */}
      <div className="flex flex-wrap gap-4 p-6">
        {lists.map((list) => (
          <div
            key={list.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, list.id)}
            className="bg-teal-200 rounded-lg p-3 w-64"
          >
            {/* List header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium">{list.title}</h2>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {list.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, list.id, card.id)}
                  className="bg-white rounded-md shadow px-3 py-2 text-sm whitespace-pre-line cursor-grab active:cursor-grabbing"
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
                  className="w-full border rounded px-2 py-1 text-sm mb-2"
                  placeholder="Enter card title..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddCard(list.id)}
                    className="px-2 py-1 bg-purple-600 text-white text-xs rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setActiveListForCard(null);
                      setNewCardText("");
                    }}
                    className="px-2 py-1 bg-gray-300 text-xs rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveListForCard(list.id)}
                className="text-xs text-gray-700 mt-2 hover:underline"
              >
                + Add to card
              </button>
            )}
          </div>
        ))}

        {/* Add List */}
        <div className="w-64">
          {showAddList ? (
            <div className="bg-white p-3 rounded-lg shadow">
              <input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name"
                className="w-full border rounded px-2 py-1 mb-2 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateList}
                  className="px-2 py-1 bg-purple-600 text-white text-xs rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddList(false)}
                  className="px-2 py-1 bg-gray-300 text-xs rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddList(true)}
              className="bg-teal-200 px-4 py-3 w-full rounded-lg flex items-center justify-center hover:bg-teal-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Add to list</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
