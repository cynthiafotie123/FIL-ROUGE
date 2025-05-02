import { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"
import TaskList from "../components/TaskList"

const TaskContext = createContext()

const tasks = []

export function TaskProvider({ children }) {
  const [taskList, setTaskList] = useState(tasks)

  const fetchTasks = async () => {
    const res = await api.get('/api/tasks');
    setTaskList(res.data.Tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleDelete = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const handleSubmit = async (e, title) => {
    e.preventDefault();
    const res = await api.post('/api/tasks', {"name" : title });
    fetchTasks();

  };


  return (
    <TaskContext.Provider value={{ taskList, handleDelete, handleSubmit }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}