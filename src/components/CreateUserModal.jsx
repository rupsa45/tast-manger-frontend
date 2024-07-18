import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { createTask } from "../api/taskApi";

export default function CreateUserModal({onTaskCreated}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await createTask(inputs);
       onTaskCreated(inputs);
      onClose();
      toast({
        title: "Task created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            bg="teal.500"
            color="white"
            p={4}
          >
            Add Todo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} p={6}>
            <FormControl mb={4}>
              <FormLabel fontSize="lg">Title</FormLabel>
              <Input
                name="title"
                placeholder="Enter title"
                value={inputs.title}
                onChange={handleInputChange}
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="lg">Description</FormLabel>
              <Textarea
                name="description"
                resize="vertical"
                placeholder="Enter description"
                value={inputs.description}
                onChange={handleInputChange}
                size="lg"
                focusBorderColor="teal.500"
              />
            </FormControl>
            <FormControl mt={4}>
              <Checkbox
                name="completed"
                isChecked={inputs.completed}
                onChange={handleInputChange}
                size="lg"
              >
                Completed
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
