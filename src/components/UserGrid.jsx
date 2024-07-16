import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { USERS } from "../dummy/dummy";
import UserCard from "./UserCard";


const UserGrid = ({  onEdit, onDelete, onToggleComplete }) => {
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {USERS.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </Grid>

      {/* {isLoading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} />
				</Flex>
			)} */}
      {/* {!isLoading && USERS.length === 0 && (
				<Flex justifyContent={"center"}>
					<Text fontSize={"xl"}>
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Poor you! 🥺
						</Text>
						No friends found.
					</Text>
				</Flex>
			)} */}
    </>
  );
};

export default UserGrid;