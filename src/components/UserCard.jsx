import { Card, CardHeader, CardBody, Flex, Box, Heading, Text, Switch, IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";

const UserCard = ({ user, onEdit, onDelete, onToggleComplete }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await onDelete(user.id);
      toast({
        title: "Task deleted successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while deleting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    
    <Card>
      <CardHeader>
        <Flex justify="space-between" alignItems="center">
          <Flex gap={4} alignItems="center">
            <Box>
              <Heading size="sm">{user.title}</Heading>
            </Box>
          </Flex>
          <Flex alignItems="center">
            <Switch
              size="md"
              colorScheme="teal"
              isChecked={user.completed}
              onChange={() => onToggleComplete(user.id)}
            />
            <IconButton
              variant="ghost"
              colorScheme="blue"
              size="sm"
              aria-label="Edit user"
              icon={<BiEdit size={20} />}
              onClick={onOpen}
            />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size="sm"
              aria-label="Delete user"
              icon={<BiTrash size={20} />}
              onClick={handleDelete}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
