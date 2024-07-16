import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { login } from "../api/usersApi";
  
  const Login = () => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await login({email,password});
        toast({
        title: 'Logged in successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        });
        navigate('/');
      } catch (error) {
        toast({
          title: "Error",
          description: "Login unsuccessful",
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
              Login
            </Heading>
            <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="blue" mt={6} type="submit" w="100%">
                Login
              </Button>
              <div className="text-center">
                <Link to="/signup">
                  Access the{" "} SignUp 
                  area
                </Link>
              </div>
            </form>
          </Stack>
        </Box>
      </Container>
    );
  };
  
  export default Login;