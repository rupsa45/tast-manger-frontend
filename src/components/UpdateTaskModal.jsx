import  { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const UpdateTaskModal = ({ isOpen, onClose, user, onEdit }) => {
  const [title, setTitle] = useState(user.title);
  const [description, setDescription] = useState(user.description);
  const toast = useToast();

  // Update state when the modal is opened with a different task
  useEffect(() => {
    if (isOpen) {
      setTitle(user.title);
      setDescription(user.description);
    }
  }, [isOpen, user]);

  const handleSave = async () => {
    try {
      await onEdit(user._id, { title, description });
      toast({
        title: "Task updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error while updating.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={3}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTaskModal;
