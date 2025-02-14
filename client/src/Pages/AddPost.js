import React, { useCallback, useEffect, useState } from "react";
import { Box, Text, Flex, VStack, useToast, Spinner } from "@chakra-ui/react";
import DoPost from "../Component/DoPost";
import Header from "../Component/Header";
import { useChange } from "../context/StateProvider";
import Post from "../Component/Post";
import axios from "axios";

const AddPost = () => {
  const { user, token, myPost, setMyPost, setPosts } = useChange();
  const [loading, setLoading] = useState(false); // ✅ State to track loading
  const toast = useToast();
console.log(setMyPost,"log");
  const fetchMyPosts = useCallback(async () => {
    if (!user || !token) return; // ✅ Prevent API call if user or token is missing

    setLoading(true); // ✅ Show loader before fetching
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/post/${user._id}`,
        config
      );
      setMyPost(data.posts.reverse());
    } catch (error) {
      toast({
        title: "Failed to fetch posts",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false); // ✅ Hide loader after fetching
  }, [user, token, setMyPost, toast]);
  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]); // ✅ Ensures it runs when dependencies change

  return (
    <Box
      minH="100vh"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Header />

      {/* DoPost Component */}
      <Flex
        w={{ base: "100%", md: "70%" }}
        flexDir="column"
        mt={6}
        alignItems="center"
      >
        <DoPost />
      </Flex>

      {/* My Posts Section */}
      <Flex
        w={{ base: "100%", md: "70%" }}
        flexDir="column"
        mt={6}
        alignItems="center"
      >
        <VStack
          spacing={4}
          w="full"
          p={4}
          boxShadow="lg"
          borderRadius="lg"
          overflowY="auto"
          maxH="500px"
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            My Posts
          </Text>

          {/* ✅ Show Loader when Fetching */}
          {loading ? (
            <Spinner size="xl" color="blue.500" thickness="4px" />
          ) : myPost.length > 0 ? (
            myPost.map((post) => (
              <Post
                key={post._id}j
                setPosts={setMyPost}
                post={post}
                deleteMyPost={() =>
                  setMyPost(myPost.filter((p) => p._id !== post._id))
                }
              />
            ))
          ) : (
            <Text>No posts found.</Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default AddPost;
