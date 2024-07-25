import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserGrid from "./components/UserGrid";

function App() {
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Box maxW="container.md" mx="auto" p={3}>
        <Tabs variant="enclosed" onChange={(index) => {
          if (index === 0) setFilter("all");
          else if (index === 1) setFilter("completed");
          else if (index === 2) setFilter("incomplete");
        }}>
          <TabList>
            <Tab>Todos</Tab>
            <Tab>Complete</Tab>
            <Tab>InComplete</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize="20px">Add Your Todos here 👉</Text>
              <UserGrid filter={filter} />
            </TabPanel>
            <TabPanel>
              <Text fontSize="20px">Completed tasks will be shown here.</Text>
              <UserGrid filter="completed" />
            </TabPanel>
            <TabPanel>
              <Text fontSize="20px">Incomplete tasks will be shown here.</Text>
              <UserGrid filter="incomplete" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default App;
