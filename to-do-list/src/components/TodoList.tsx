import React from "react";
import { Todo } from "../App";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdateTask: (id: number, isComplete: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTask, onDeleteTask }) => (
  <ul className="space-y-4">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    ))}
  </ul>
);
