import React, { useState } from "react";
import {
  Avatar,
  Box,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Textarea,
  Text,
  useDisclosure,
  useToast,
  Image,
  Spinner,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { useChange } from "../context/StateProvider";
import { doPostApi } from "../Api/post";

const DoPost = () => {
  const { user, token, setPosts,setMyPost } = useChange();
  const [text, setText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handlePost = async () => {
    setLoading(true);
    const data = await doPostApi({ text, image }, user, token);
    if (data.success) {
      toast({
        title: "Post created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setPosts((prevPosts) => [data.post, ...prevPosts]);
      console.log(setMyPost);
      setMyPost((prevPosts) => [data.post, ...prevPosts]);
    
    } else {
      toast({
        title: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
    setText("");
    setImage(null);
    setImageUrl(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      {/* Centering the button */}
      <Flex justifyContent="center" mt={4}>
        <Button
          colorScheme="blue"
          onClick={onOpen}
          size="lg"
          borderRadius="full"
          px={6}
          py={4}
        >
          Add New Post
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Avatar size="sm" name={user.name} src={user.pic} mr={2} />
            <Text fontWeight="bold">{user.name}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="md"
              resize="none"
            />
            {imageUrl && (
              <Image 
              src={imageUrl} 
              alt="Uploaded" 
              mt={4} 
              borderRadius="xl" 
              maxH="400px" 
              w="100%" 
              objectFit="cover" 
              boxShadow="md"
            />
            
            )}
            <FormControl mt={4}>
              <label htmlFor="photo-upload">
                <IconButton
                  as="span"
                  icon={<FiImage />}
                  aria-label="Upload Image"
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePost} isLoading={loading}>
              {loading ? <Spinner size="sm" /> : "Post"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DoPost;
