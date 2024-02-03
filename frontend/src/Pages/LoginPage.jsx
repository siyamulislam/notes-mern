import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
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
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../Redux/authReducer/action";
import Error from "../Components/Error";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../Assets/images/logo.png";
import { FaExclamationCircle } from "react-icons/fa";
import { isValidEmail } from "../utility/validators";

const initialState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate()

  //handle error and data
  const [user, setUser] = useState(initialState);
  const [emailError, setEmailError] = useState("");

  //Redux Store
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.authReducer.isLoading);
  const message = useSelector((store) => store.authReducer.message);
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const isError = useSelector((store) => store.authReducer.isError);

  // Toast feature
  const toast = useToast();
  const positions = ["top"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "email"){
      const err = isValidEmail(value) ? "" : "enter valid email address";
      setEmailError(err);
    }
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = () => {
    if (user?.email && user?.password && !emailError) {
      dispatch(loginAction(user));
    } else {
      toast({
        title: `Enter the valid credentials ⚠`,
        position: positions[0],
        isClosable: true,
        duration: 1000,
        status: "warning",
      });
    }
  };



  if (isAuth) {
    return <Navigate to={"/notes"} />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Box
      w={"100%"}
      bg={"linear-gradient(#091216, #872341)"}
      padding={"50px 0px 120px 0px"}
    >
      <Container
        minW={{ base: "97%", md: "85%", lg: "800px" }}
        margin={"auto"}
        padding={{
          base: "20px 10px 30px 10px",
          md: "10px 10px 30px 10px",
          lg: "20px 30px 30px 30px",
        }}
        bg={"#BE3144"}
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
            <Heading size={"lg"}>Login</Heading>
            <Divider color={"blue.500"} />
            {message && (
              <Text color={isAuth ? "green" : "black"}>{message}</Text>
            )}
            <FormControl>
              <FormLabel>Email : </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  name="email"
                  value={user?.email}
                  placeholder="Email address"
                  _placeholder={{ color: "white" }}
                  onChange={handleChange}
                  isDisabled={isAuth}
                />
              </InputGroup>
                {emailError && <HStack color={"black"} gap={"5px"} alignItems={"center"}><FaExclamationCircle /> <Text textAlign={"left"}>{emailError}</Text></HStack> }
            </FormControl>
            <FormControl>
              <FormLabel>Password : </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  _placeholder={{ color: "white" }}
                  onChange={handleChange}
                  name="password"
                  value={user?.password}
                  isDisabled={isAuth}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    style={{ background: "white" }}
                    onClick={handleClick}
                    isDisabled={isAuth}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text textAlign={"right"} marginTop={"5px"} cursor={"pointer"} _hover={{color:"black"}} onClick={()=> navigate("/forgot-password")}>Forgot Password?</Text>
            </FormControl>
            <Button
              w={"full"}
              colorScheme="green"
              marginTop={"20px"}
              onClick={handleLogin}
              isLoading={isLoading}
            >
              Log in
            </Button>
            <Box w={"full"}>
              {/* Google */}
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text color={"white"}>Sign in with Google</Text>
                </Center>
              </Button>

              <HStack marginTop={"10px"} justifyContent={"center"}>
                <Text >Not registered?</Text>
                <Text color={"blue.400"} cursor={"pointer"} _hover={{ textDecoration: "underline"}} onClick={()=> navigate("/signup")}>Create account</Text>
              </HStack>
            </Box>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
