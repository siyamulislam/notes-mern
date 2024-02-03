import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { getItemLS } from "../localStorage/localStorage";
import robotImg from "../Assets/images/home robot.png"

const HomePage = () => {
  const navigate = useNavigate();

  //Redux Store
  const isAuth = getItemLS("auth")?.isAuth || false;

  return (
    <Box bg={"linear-gradient(#091216, #872341)"}>
      <Container maxW={"7xl"} paddingTop={"100px"}>
        <HStack justifyContent={"center"} margin={"0px auto 30px auto"}>
          <Heading
            color={"#F05941"}
            fontSize={{ base: "25px", md: "50px", lg: "50px" }}
          >
            Welcome to Notes :
          </Heading>
          <Heading
            color={"#29ADB2"}
            fontSize={{ base: "25px", md: "40px", lg: "40px" }}
          >
            Your Digital Notebook Oasis
          </Heading>
        </HStack>
        <Text
          color={"gray.300"}
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "25px", lg: "25px" }}
          marginBottom={"20px"}
        >
          Unleash the Power of Organization and Creativity
        </Text>
        <Text color={"gray.400"} width={"80%"} margin={"0px auto 60px auto"}>
          Are you tired of scattered notes, lost ideas, and the constant
          struggle to keep track of your thoughts? Look no further – Notes is
          here to revolutionize the way you take and manage notes.
        </Text>
        {isAuth ? (
          ""
        ) : (
          <Button
            variant={"outline"}
            color={"skyblue"}
            padding={"23px"}
            marginBottom={"30px"}
            transition={"border-radius 0.3s ease-in-out"}
            _hover={{
              borderRadius: "20px",
            }}
            boxShadow={
              "rgb(255, 255, 255) 0px 4px 6px -1px, rgba(255, 255, 255, 0.974) 0px 2px 4px -1px"
            }
            rightIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        )}
        <Image
          src={robotImg}
          margin={"auto"}
        />
      </Container>
    </Box>
  );
};

export default HomePage;
