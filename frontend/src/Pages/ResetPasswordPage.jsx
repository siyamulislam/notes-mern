import { EmailIcon, LockIcon } from "@chakra-ui/icons";
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
import { FaExclamationCircle, FaChevronLeft, FaLock  } from "react-icons/fa";
import { isPasswordValid, isValidEmail } from "../utility/validators";
import { useNavigate, useParams } from "react-router-dom";
import userAPI from "../Redux/authReducer/action";
import axios from "axios";



function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "password"){
            const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
            setPasswordError(err);
            setPassword(value);
        }

        if(name === "confirmPassword"){
            setConfirmPassword(value);
        }
      
    };
  
    const handleSubmit = async () => {
      if (password && confirmPassword && !passwordError) {
        if(password !== confirmPassword){
            setMessage("Password Mismatch")
        }else{
            setMessage("")
            setLoading(true);
            try {
              let res = await axios.post(`${userAPI}/reset-password`, {
                token: token,
                newPassword: password
              });
              setAction(res.data.action)
              setMessage(res.data.message)
              setLoading(false);
              setPassword("")
              setConfirmPassword("");
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
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
          padding={{ base: "20px 10px", md: "30px 40px", lg: "30px 40px" }}
          rounded={"10px"}
          shadow={"lg"}
        >
          <FaLock  fontSize={"50px"} color="tomato" />
          <Text fontSize={"25px"} fontWeight={"bold"}>
            Reset Password
          </Text>
          <Text color={"gray.500"}>
            Enter new password
          </Text>
          {message && ( <HStack color={ action ? "green" : "red"} gap={"5px"} alignItems={"center"} marginTop={"5px"}><Text textAlign={"left"}>{message}</Text> </HStack>  )}
          <FormControl marginTop={"20px"}>
            <FormLabel>Password : </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleChange}
              />
            </InputGroup>
            {passwordError && ( <HStack color={"red"} gap={"5px"} alignItems={"center"}><Text textAlign={"left"}>{passwordError}</Text> </HStack>  )}
            
          </FormControl>

          <FormControl marginTop={"20px"}>
            <FormLabel>Confirm Password : </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
              <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
  
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            width={"100%"}
            colorScheme="green"
            marginTop={"20px"}
          >
            Reset Password
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
}


export default ResetPasswordPage
