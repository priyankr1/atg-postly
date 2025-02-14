import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Avatar,
  Image,
  Flex,
  Heading,
  IconButton,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useChange } from "../context/StateProvider";
import axios from "axios";
import Option from "./Option";
import Comment from "./Comment";

const Post = ({ post, deleteMyPost, setPosts }) => {
  const { user, token, posts } = useChange();
  const [showOption, setShowOption] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeM, setLikeM] = useState([]);
  const toast = useToast();
console.log(setPosts);
  useEffect(() => {
    if (showComment) fetchComments();
  }, [showComment]);

  useEffect(() => {
    fetchLikes();
  }, [posts]);

  const fetchLikes = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/like/${post._id}`, config);
    setLike(data.likeLen > 0 ? +data.likeLen : 0);
    setLikeM(data.allLike);
  };

  const fetchComments = async () => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/comment/${post._id}`, config);
    setComments(data.comments);
  };

  const giveLike = async () => {
    setLikeLoading(true);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const alreadyLiked = likeM.some((like) => like.user?._id === user?._id && like?.post === post?._id);
    
    if (!alreadyLiked) {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/like/${post._id}`, {}, config);
      if (data.success) {
        toast({ title: data.message, status: "success", duration: 3000, isClosable: true, position: "top" });
        setLikeM((prev) => [data.like, ...prev]);
        setLike(likeM.length);
      }
    } else {
      toast({ title: "You already liked this post", status: "warning", duration: 3000, isClosable: true, position: "top" });
    }
    setLikeLoading(false);
  };

  const doneComment = async () => {
    if (!comment) {
      toast({ title: "Comment is empty", status: "warning", duration: 3000, isClosable: true, position: "top" });
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/comment/${post._id}`, { text: comment }, config);
    if (data.success) {
      toast({ title: "Comment added successfully", status: "success", duration: 3000, isClosable: true, position: "top" });
      setComments([data.comment, ...comments]);
      setComment("");
    }
  };

  return (
    <Card width={{ base: "90vw", md: "50vw" }} maxW="600px" borderRadius="xl" shadow="lg" p={4} bg="white">
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={3}>
            <Avatar name={post?.user?.name} src={post?.user?.pic} size="md" />
            <Box>
              <Heading size="sm">{post?.user?.name}</Heading>
            </Box>
          </Flex>
          {user?._id === post?.user?._id && (
            <IconButton
              variant="ghost"
              aria-label="Options"
              icon={<i className="bi bi-three-dots-vertical"></i>}
              onClick={() => setShowOption(!showOption)}
            />
          )}
          {showOption && <Option handleFunction={deleteMyPost} showOption={showOption} setShowOption={setShowOption} post={post} setPosts={setPosts} />}
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        {post.image && <Image src={post.image} alt="Post" borderRadius="lg" maxH="300px" w="100%" objectFit="cover" />}
        {post.text && <Text mb={2}>{post.text}</Text>}
      </CardBody>
      <Divider />
      <CardFooter display="flex" flexDirection="column" gap={3}>
        <Flex justifyContent="space-between">
          <Button leftIcon={<i className="bi bi-hand-thumbs-up"></i>} onClick={likeLoading ? undefined : giveLike} variant="ghost">
            {likeM.length} Like
          </Button>
          <Button leftIcon={<i className="bi bi-chat-dots"></i>} onClick={() => setShowComment(!showComment)} variant="ghost">
            Comment
          </Button>
        </Flex>
        {showComment && (
          <VStack spacing={3} w="100%">
            <InputGroup>
              <Input placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
              <InputRightElement>
                <IconButton icon={<i className="bi bi-send"></i>} size="sm" onClick={doneComment} />
              </InputRightElement>
            </InputGroup>
            <Box w="100%" maxH="200px" overflowY="auto">
              {comments.map((c) => (
                <Comment key={c._id} comment={c} />
              ))}
            </Box>
          </VStack>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
