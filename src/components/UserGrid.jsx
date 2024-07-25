import { useEffect, useState } from "react";
import { Flex, Grid, Spinner, Text, useToast } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { getAllTasks, deleteTask, updateTask, getCompletedTasks, getIncompleteTasks } from "../api/taskApi";
import CreateUserModal from "./CreateUserModal";

const UserGrid = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      let data;
      if (filter === "completed") {
        data = await getCompletedTasks();
      } else if (filter === "incomplete") {
        data = await getIncompleteTasks();
      } else {
        data = await getAllTasks();
      }
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast({
        title: "Task deleted successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "There was an error while deleting the task.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);
      if (!task) {
        console.error(`Task with id ${id} not found`);
        return;
      }
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
      toast({
        title: "Error",
        description: "There was an error while toggling the task completion.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
      );
      toast({
        title: "Task updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "There was an error while updating the task.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
              onEdit={handleEdit}
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
