
import { Box, Container, Flex, Button , useColorMode, useColorModeValue} from '@chakra-ui/react'
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/usersApi';



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container
      maxW={"900px"}
    >
      <Box 
        px={4}
        my={4}
        bg={useColorModeValue("gray.200", "gray.700")}
        borderRadius={4}
      >
        <Flex 
          h="16"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* {Left side} */}


          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{base:"none",sm:"flex"}}
            fontFamily={ "Montserrat"}
            fontSize={25}
            cursor={'pointer'}
          >
           <Link to='/'> Task Manager</Link>
          </Flex>



          {/* {Right side} */}


          <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
          display={{base:"none",sm:"flex"}}
          >
            <Button onClick={toggleColorMode}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
						</Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Flex>

          
        </Flex>
      </Box>
    </Container>
  )
}

export default Navbar