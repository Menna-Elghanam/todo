import React from "react";
import { Todo } from "../App";
import { CheckIcon, TrashIcon } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onUpdateTask: (id: number, isComplete: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTask, onDeleteTask }) => (
  <li className="bg-white bg-opacity-40 p-4 rounded-md">
    <h3 className="font-medium text-blue-900">{todo.title}</h3>
    <p className="text-sm text-gray-700 mt-1">{todo.description}</p>
    <p className="text-xs text-gray-500">Due: {todo.date}</p>
    <div className="flex justify-between items-center mt-3">
      <button
        onClick={() => onUpdateTask(todo.id, !todo.isComplete)}
        className={`px-3 py-1 rounded-md text-sm flex items-center ${
          todo.isComplete
            ? "bg-green-200 text-green-800"
            : "bg-blue-200 text-blue-800"
        }`}
      >
        <CheckIcon size={16} className="mr-1" />
        {todo.isComplete ? "Completed" : "Mark Complete"}
      </button>
      <button
        onClick={() => onDeleteTask(todo.id)}
        className="bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm flex items-center"
      >
        <TrashIcon size={16} className="mr-1" />
        Delete
      </button>
    </div>
  </li>
);