import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../../Api/authentication";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { useChange } from "../../context/StateProvider";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useChange();
  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({ title: "Please fill all the fields.", status: "warning", duration: 5000, isClosable: true, position: "top" });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match.", status: "warning", duration: 5000, isClosable: true, position: "top" });
      setLoading(false);
      return;
    }
    try {
      const data = await signupApi({ name, email, password, passwordConfirm: confirmPassword });
      if (data.success) {
        toast({ title: "Account created successfully", status: "success", duration: 5000, isClosable: true, position: "top" });
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setToken(data.token);
        navigate("/");
      } else {
        toast({ title: data.message, status: "error", duration: 5000, isClosable: true, position: "top" });
      }
    } catch (err) {
      toast({ title: "An error occurred.", status: "error", duration: 5000, isClosable: true, position: "top" });
    }
    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="6vh" px={4}>
      <Card w={{ base: "100%", sm: "90%", md: "400px" }} p={5} boxShadow="lg" borderRadius="md">
        <CardBody>
          <Heading size="lg" textAlign="center" mb={4}>Sign Up</Heading>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={show ? "text" : "password"} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement>
                  <Button size="sm" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type={show ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>

            <Button colorScheme="blue" width="100%" onClick={submitHandler} isLoading={loading}>Sign Up</Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Signup;
