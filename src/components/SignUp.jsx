import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link } from "react-router-dom";
 import { signUp } from "../api/usersApi";
  const SignUp = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signUp(formData);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error creating your account.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Container maxW="lg" centerContent>
        <Box p={8} boxShadow="lg" borderRadius="lg" w="100%" maxW="md">
          <Stack spacing={4}>
            <Heading as="h1" size="lg" textAlign="center">
              Sign Up
            </Heading>
            <Text textAlign="center" color="gray.600">
              Create an account to use Task Manager
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email" isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="blue" mt={6} type="submit" w="100%">
                Sign Up
              </Button>
              <div>
                <Link to="/login">
                  Access the{" "} Login 
                  area
                </Link>
              </div>
            </form>
          </Stack>
        </Box>
      </Container>
    );
  };
  
  export default SignUp;