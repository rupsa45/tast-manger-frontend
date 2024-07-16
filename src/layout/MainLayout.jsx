import { Stack } from "@chakra-ui/react";
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
  return (
    
    <Stack minH={"100vh"}>
        <Navbar />
        {children}
    </Stack>
    
  )
}

export default MainLayout;