import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link,
  Heading,
  useToast,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useChange } from "../../context/StateProvider";
import { loginApi } from "../../Api/authentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { setUser, setToken } = useChange();

  const submitUpdPass = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/user/reset-password/${verifyToken}`,
        { password, passwordConfirm: confirmPassword, email }
      );
      toast({ title: data.message, status: "success", duration: 5000, isClosable: true });
      setForgotPassword(false);
    } catch (err) {
      toast({ title: err.response.data.message, status: "error", duration: 5000, isClosable: true });
    }
  };

  const forgotPass = async () => {
    try {
      console.log("hello");
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/user/forgot-password`,{ email }
      );
      toast({ title: data.message, status: "success", duration: 5000, isClosable: true });
      setForgotPassword(true);
    } catch (err) {
      toast({ title: err.response.data.message, status: "error", duration: 5000, isClosable: true });
    }
  };

  const submintHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({ title: "Please fill all fields.", status: "warning", duration: 5000, isClosable: true });
      setLoading(false);
      return;
    }

    const data = await loginApi({ email, password });
    if (data.success) {
      toast({ title: "Logged in successfully", status: "success", duration: 5000, isClosable: true });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setToken(data.token);
      navigate("/");
    } else {
      toast({ title: data.message, status: "error", duration: 5000, isClosable: true });
    }
    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="70vh" px={4}>
      <Card w={{ base: "100%", sm: "90%", md: "400px" }} p={5} boxShadow="lg" borderRadius="md">
        <CardBody>
          <Heading size="lg" textAlign="center" mb={4}>Login</Heading>
          {!forgotPassword ? (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
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

              <Button colorScheme="blue" width="100%" onClick={submintHandler} isLoading={loading}>Log in</Button>
              <Link color="blue.500" onClick={forgotPass}>Forgot password?</Link>
            </VStack>
          ) : (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Verify Token</FormLabel>
                <Input placeholder="Enter token" onChange={(e) => setVerifyToken(e.target.value)} value={verifyToken}/>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>New Password</FormLabel>
                <Input type={show ? "text" : "password"} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type={show ? "text" : "password"} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
              </FormControl>

              <Button colorScheme="blue" width="100%" onClick={submitUpdPass}>Update Password</Button>
            </VStack>
          )}
        </CardBody>
      </Card>
    </Box>
  );
};

export default Login;
