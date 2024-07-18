import { useEffect, useState } from "react";
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { getAllTasks, deleteTask, updateTask } from "../api/taskApi";
import CreateUserModal from "./CreateUserModal";

const UserGrid = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      if (task) {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(id, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <CreateUserModal onTaskCreated={handleTaskCreated} />
      {isLoading ? (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      ) : tasks.length === 0 ? (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Poor you! 🥺
            </Text>
            No tasks found.
          </Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {tasks.map((task) => (
            <UserCard
              key={task._id}
              user={task}
              onEdit={onEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default UserGrid;
