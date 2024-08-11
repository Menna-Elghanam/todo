import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  onOpenCalendar: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSubmit, onOpenCalendar }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 bg-white bg-opacity-40 placeholder-slate-800 outline-none"
        />
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task description"
          className="w-full border border-gray-300 p-2 rounded-md mb-4 bg-white bg-opacity-40 placeholder-slate-800 outline-none"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 text-white hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onOpenCalendar}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
          >
            <CalendarIcon size={18} />
          </button>
          <button
            onClick={() => onSubmit(newTaskTitle, newTaskDescription)}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};