import React, { useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import ProjectManagementHeader from "../../components/nav&footer/ProjectManagementHeader";

export default function ProjectManagement() {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [activeListForCard, setActiveListForCard] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");

  const [lists, setLists] = useState([
    { keyField: "Open", headerText: "To Do" },
    { keyField: "InProgress", headerText: "In Progress" },
    { keyField: "Testing", headerText: "Testing" },
    { keyField: "Close", headerText: "Done" },
  ]);

  const [cards, setCards] = useState([
    { Id: 1, Status: "Open", Summary: "Analyze requirements" },
    { Id: 2, Status: "InProgress", Summary: "Improve app performance" },
    { Id: 3, Status: "Testing", Summary: "QA testing" },
  ]);

  /** ====== CREATE LIST ====== */
  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) {
      alert("List name is required!");
      return;
    }
    const keyField = newListName.replace(/\s+/g, "");
    if (lists.some((list) => list.keyField === keyField)) {
      alert("List with this name already exists!");
      return;
    }
    setLists([...lists, { keyField, headerText: newListName }]);
    setNewListName("");
    setShowCreateListModal(false);
  };

  /** ====== ADD CARD ====== */
  const handleAddCardToList = (listKey) => {
    if (!newCardTitle.trim()) {
      alert("Please enter a card title");
      return;
    }
    const newId = cards.length > 0 ? cards[cards.length - 1].Id + 1 : 1;
    const newCard = {
      Id: newId,
      Status: listKey,
      Summary: newCardTitle,
    };
    setCards([...cards, newCard]);
    setNewCardTitle("");
    setActiveListForCard(null);
  };

  /** ====== HANDLE DRAG & DROP UPDATE ====== */
  const onCardDragStop = (args) => {
    if (args.data && args.data.length > 0) {
      const updatedCards = cards.map((card) =>
        card.Id === args.data[0].Id
          ? { ...card, Status: args.data[0].Status }
          : card
      );
      setCards(updatedCards);
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-x-auto p-6 bg-[#f5f5f5] dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">TaskFlow</h1>
            <button
              onClick={() => setShowCreateListModal(true)}
              className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              + Create List
            </button>
          </div>

          {/* Kanban Board */}
          <KanbanComponent
            id="kanban"
            keyField="Status"
            dataSource={cards}
            cardSettings={{
              contentField: "Summary",
              headerField: "Id",
            }}
            dragStop={onCardDragStop}
          >
            <ColumnsDirective>
              {lists.map((list) => (
                <ColumnDirective
                  key={list.keyField}
                  headerText={list.headerText}
                  keyField={list.keyField}
                />
              ))}
            </ColumnsDirective>
          </KanbanComponent>

          {/* Inline Add Card per List */}
          <div className="flex gap-4 mt-6">
            {lists.map((list) => (
              <div
                key={list.keyField}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 w-64 flex-shrink-0"
              >
                <ProjectManagementHeader
                  cardsCount={cards.filter(
                    (card) => card.Status === list.keyField
                  ).length}
                />


                {activeListForCard === list.keyField ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2 dark:text-white"
                      placeholder="Enter card title"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddCardToList(list.keyField)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setNewCardTitle("");
                          setActiveListForCard(null);
                        }}
                        className="bg-gray-300 px-3 py-1 rounded text-sm dark:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                ) 
                : (
                  <button
                    onClick={() => setActiveListForCard(list.keyField)}
                    className="mt-2 w-full text-left px-1 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 rounded"
                  >
                    + Add Card
                  </button>
                )
                }
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal for Create List */}
      {showCreateListModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Create New List</h2>
            <form onSubmit={handleCreateList}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 dark:bg-gray-700 dark:text-white"
                placeholder="List name"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateListModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
