import  { useState, useEffect } from "react";
import axios from "axios";
import { TodoList } from "./components/TodoList";
import { AddTaskModal } from "./components/AddTaskModal";
import { DatePickerModal } from "./components/DatePickerModal";
import { PlusIcon } from "lucide-react";
import "./App.css";

const API_BASE_URL = "http://localhost:5050/api/todos";

export interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  date: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const cachedTodos = localStorage.getItem("todos");
      if (cachedTodos) {
        setTodos(JSON.parse(cachedTodos));
      }

      const response = await axios.get<Todo[]>(API_BASE_URL);
      setTodos(response.data);
      localStorage.setItem("todos", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching todos:", error);
      const cachedTodos = localStorage.getItem("todos");
      if (cachedTodos) {
        setTodos(JSON.parse(cachedTodos));
      }
    }
  };

  const handleAddTask = (title: string, description: string) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const newTodo = {
      title,
      description,
      date: formattedDate,
      isComplete: false,
    };

    axios
      .post(API_BASE_URL, newTodo)
      .then((response) => {
        const updatedTodos = [...todos, response.data];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
        const tempId = Date.now();
        const tempTodo = { ...newTodo, id: tempId };
        const updatedTodos = [...todos, tempTodo];
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      });

    setIsModalOpen(false);
  };

  const handleUpdateTask = (id: number, isComplete: boolean) => {
    axios
      .put(`${API_BASE_URL}/${id}`, { isComplete })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, isComplete } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, isComplete } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      });
  };

  const handleDeleteTask = (id: number) => {
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      });
  };

  return (
    <div className="min-h-screen bg-[url('./main1.jpg')] bg-cover bg-center h-full w-full p-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Todo App</h1>
      <div className="w-1/4">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white border-opacity-30">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Tasks</h2>
          <TodoList
            todos={todos}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
          >
            <PlusIcon size={16} className="mr-2" />
            Add New Task
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />
      )}

      {isCalendarOpen && (
        <DatePickerModal
          selectedDate={selectedDate}
          onDateChange={(date: Date) => {
            setSelectedDate(date);
            setIsCalendarOpen(false);
          }}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </div>
  );
}
