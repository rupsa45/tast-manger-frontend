import { Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserGrid from "./components/UserGrid";



function App() {
  return (
    <>
      <Box maxW="container.md" mx="auto" p={4}>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Todos</Tab>
            <Tab>Complete</Tab>
            <Tab>InComplete</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Todos content goes here!</p>
              <UserGrid  />
            </TabPanel>
            <TabPanel>
              <p>Complete content goes here!</p>
            </TabPanel>
            <TabPanel>
              <p>InComplete content goes here!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default App;