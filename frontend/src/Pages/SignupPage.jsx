import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import userAPI, { signupAction } from "../Redux/authReducer/action";
import Error from "../Components/Error";
import logo from "../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { isPasswordValid, isValidEmail } from "../utility/validators";
import { FaExclamationCircle, FaFrown, FaGrinHearts  } from "react-icons/fa";
import axios from "axios";
import debounce from 'lodash/debounce';

const initialState = {
  username: "",
  email: "",
  password: "",
};


const SignupPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()
  
  
  //handle error and data
  const [user, setUser] = useState(initialState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameAvailable, setusernameAvailable] = useState(false);

  //Redux Store
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.authReducer.isLoading);
  const isError = useSelector((store) => store.authReducer.isError);

  // Toast feature
  const toast = useToast();
  const positions = ["top"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "username"){
      checkUsernameAPI(value);
    }

    if(name === "email"){
      checkUsernameAPI(value)
      const err = isValidEmail(value) ? "" : "enter valid email address";
      setEmailError(err);
    }

    if(name === "password"){
      const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
      setPasswordError(err);
    }

    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignup = () => {
    if (user?.username && user?.email && user?.password && !emailError && !passwordError && usernameAvailable)  {
      dispatch(signupAction(user)).then(() => {
        toast({
          title: `Registered successfully`,
          position: positions[0],
          isClosable: true,
          duration: 1000,
          status: "success",
        });
      });
      setUser(initialState);
    }
  };

  //username availability check
  const checkUsernameAPI =  debounce(async (name)=>{
    setUsernameLoading(true);
    try {
      const res = await axios.get(`${userAPI}/check-username/${name}`)
      setusernameAvailable(res.data.available)
      if(res.data.available){
        setUsernameError("");
      }else{
        setUsernameError("username not available")
      }
      setUsernameLoading(false);
    } catch (error) {
      setUsernameLoading(false);
      setUsernameError("Error checking username availability")
      console.log(error)
    }
  }, 1000)

  if (isError) {
    return <Error />;
  }

  return (
    <Box  
      w={"100%"}
      bg={"linear-gradient(#091216, #872341)"}
      padding={"30px 0px 120px 0px"}>

      <Container
       minW={{ base: "97%", md: "85%", lg: "800px" }}
        margin={"auto"}
        padding={{
          base: "20px 10px 30px 10px",
          md: "10px 10px 30px 10px",
          lg: "10px 30px 10px 30px",
        }}
        bg={"#0766AD"}
        color={"white"}
        borderRadius={{ base: "10px", md: "20px", lg: "20px" }}
        boxShadow={{
          base: "none",
          md: "rgba(30, 189, 217, 0.814) 2px 3px 10px, rgba(45, 48, 43, 0.775) 8px 3px 32px",
          lg: "rgba(30, 189, 217, 0.814) 2px 3px 10px, rgba(45, 48, 43, 0.775) 8px 3px 32px",
        }}
      >

        <Stack
          w={"100%"}
          direction={{ base: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
        >

           <Image
            src={logo}
            w={{ base: "100px", md: "40%", lg: "40%" }}
            margin={"auto"}
          />

          <VStack
             w={{ base: "100%", md: "60%", lg: "50%" }}
             spacing={"20px"}
             padding={{ base: "0px", md: "20px", lg: "20px" }}
          >
            <Heading size={"lg"} color={"white"}>
              Sign Up
            </Heading>
            <Divider color={"blue.500"} />
            <FormControl>
              <FormLabel>Username : </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUserShield color="white" />
                </InputLeftElement>
                <Input
                  type="text"
                  name="username"
                  value={user?.username}
                  placeholder="Username"
                  _placeholder={{ color: "white" }}
                  onChange={handleChange}
                />
                <InputRightElement>
                {usernameLoading && <CircularProgress isIndeterminate size={"15px"} color='white' />}
                </InputRightElement>
              </InputGroup>
              {usernameError && <HStack color={"black"} gap={"5px"} alignItems={"center"}><FaFrown style={{fontSize:"11px", marginTop:"5px"}} /> <Text textAlign={"left"}>{usernameError}</Text></HStack> }
              {usernameAvailable && <HStack color={"black"} gap={"5px"} alignItems={"center"}><FaGrinHearts style={{fontSize:"11px", marginTop:"5px"}} /> <Text textAlign={"left"}>username available</Text></HStack> }
            </FormControl>
            <FormControl>
              <FormLabel>Email : </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="white" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  value={user?.email}
                  placeholder="Email address"
                  _placeholder={{ color: "white" }}
                  onChange={handleChange}
                />
              </InputGroup>
              {emailError && <HStack color={"black"} gap={"5px"} alignItems={"flex-start"}><FaExclamationCircle style={{marginTop:"5px"}} /> <Text textAlign={"left"}>{emailError}</Text></HStack> }
            </FormControl>
            <FormControl>
              <FormLabel>Password : </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="white" />
                </InputLeftElement>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  _placeholder={{ color: "white" }}
                  onChange={handleChange}
                  name="password"
                  value={user?.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    style={{ background: "white" }}
                    onClick={handleClick}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError && <HStack color={"black"} gap={"5px"} alignItems={"flex-start"}><FaExclamationCircle style={{marginTop:"5px"}} /> <Text textAlign={"left"}>{passwordError}</Text></HStack> }
            </FormControl>
            <Button
              w={"full"}
              colorScheme="green"
              marginTop={"20px"}
              onClick={handleSignup}
              isLoading={isLoading}
            >
              Sign Up
            </Button>
            <Box w={"full"}>
              
              {/* Google */}
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text color={"white"}>Continue with Google</Text>
                </Center>
              </Button>

              <HStack marginTop={"10px"} justifyContent={"center"}>
                <Text >Already a user?</Text>
                <Text color={"black"} cursor={"pointer"} _hover={{ textDecoration: "underline"}} onClick={()=> navigate("/login")}>Login</Text>
              </HStack>

            </Box>
          </VStack>
         
        </Stack>
      </Container>
    </Box>
  );
};

export default SignupPage;
