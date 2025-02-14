import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { Box, useToast, Spinner, VStack, Flex, Text } from "@chakra-ui/react";
import Post from "../Component/Post";
import { useChange } from "../context/StateProvider";
import { getAllPost } from "../Api/post";
import axios from "axios";
import DoPost from "../Component/DoPost";

const LogHomePage = () => {
  const { posts, setPosts, token } = useChange();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  console.log(setPosts);
  const fetchAllPost = async () => {
    setLoading(true);
    const data = await getAllPost(token);
    if (data.success) {
      setPosts(data.posts.reverse());
    } else {
      toast({
        title: data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const deleteMyPost = async (post) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/post/${post._id}`, config);
    toast({
      title: "Your post deleted successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setPosts(posts.filter((p) => p._id !== post._id));
  };

  return (
    <Box minH="100vh" w="full" display="flex" flexDirection="column">
      <Header />
      {/* DoPost visible only on mobile */}
      <Box display={{ base: "block", md: "none" }}>
        <DoPost />
      </Box>
      <Flex flex="1" w={{ base: "100%", md: "70%" }} flexDir="column" alignSelf="center" mt={4}>
        <VStack spacing={4} w="full" p={4} boxShadow="lg" borderRadius="lg" overflowY="auto" flex="1">
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post._id} post={post} deleteMyPost={() => deleteMyPost(post)} setPosts={setPosts} />
            ))
          ) : (
            <Text>No posts available.</Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default LogHomePage;
