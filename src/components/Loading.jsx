import { Box, Center, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center h="100vh" bg="gray.100">
      <Box textAlign="center">
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
        <Text mt={4} fontSize="xl" fontWeight="semibold">
          Loading, please wait...
        </Text>
      </Box>
    </Center>
  );
};

export default Loading;