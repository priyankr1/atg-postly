import React from "react";
import {
  Box,
  Card,
  Avatar,
  Text,
  Flex,
  CardBody,
} from "@chakra-ui/react";

const Comment = ({ comment }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      p={4}
      mb={4}
      borderRadius="lg"
      boxShadow="md"
      bg="gray.50"
    >
      {comment && (
        <Flex alignItems="center" gap={3}>
          <Avatar name={comment?.user?.name} src={comment?.user?.pic} />
          <Box>
            <Text fontWeight="bold" fontSize="md">
              {comment?.user?.name.split(" ")[0]}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {comment?.text?.charAt(0).toUpperCase() + comment?.text?.slice(1).toLowerCase()}
            </Text>
          </Box>
        </Flex>
      )}
    </Card>
  );
};

export default Comment;
