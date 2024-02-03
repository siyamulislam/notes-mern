import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaExclamationCircle, FaChevronLeft } from "react-icons/fa";
import { isValidEmail } from "../utility/validators";
import { useNavigate } from "react-router-dom";
import userAPI from "../Redux/authReducer/action";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const err = isValidEmail(e.target.value) ? "" : "enter valid email address";
    setEmailError(err);
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (email && !emailError) {
      setLoading(true);
      try {
        let res = await axios.post(`${userAPI}/forgot-password`, {email});
        setAction(res.data.action)
        setMessage(res.data.message)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <Box bg={"#C5E898"} minH={"90vh"} paddingTop={"30px"}>
      <Box
        width={{ base: "300px", md: "400px", lg: "400px" }}
        bg={"white"}
        margin={"auto"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"10px"}
        padding={{ base: "50px 10px", md: "50px 40px", lg: "50px 40px" }}
        rounded={"10px"}
        shadow={"lg"}
      >
        <FaExclamationCircle fontSize={"50px"} color="red" />
        <Text fontSize={"25px"} fontWeight={"bold"}>
          Forgot Password?
        </Text>
        <Text color={"gray.500"}>
          Enter your email and we'll send you a link to reset your password
        </Text>

        <FormControl marginTop={"20px"}>
          <FormLabel>Email : </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Email address"
              onChange={handleChange}
            />
          </InputGroup>
          {emailError && ( <HStack color={"red"} gap={"5px"} alignItems={"center"}> <FaExclamationCircle />{" "}<Text textAlign={"left"}>{emailError}</Text> </HStack>  )}
          {message && ( <HStack color={ action ? "green" : "red"} gap={"5px"} alignItems={"center"} marginTop={"5px"}><Text textAlign={"left"}>{message}</Text> </HStack>  )}
        </FormControl>

        <Button
          onClick={handleSubmit}
          isLoading={loading}
          width={"100%"}
          colorScheme="red"
          marginTop={"20px"}
        >
          Submit
        </Button>

        <HStack
          onClick={() => navigate("/login")}
          marginTop={"20px"}
          color={"gray.500"}
          cursor={"pointer"}
          _hover={{ color: "black" }}
        >
          <FaChevronLeft />
          <Text>Back to Login</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
