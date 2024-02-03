import React from "react";
import { Box, Button, Container, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import errorpic from "../Assets/images/errorpic.png"

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box bg={"#872341"} paddingTop={"40px"}>
      <Container maxW={"6xl"} height={{base:"80vh", md:"90vh", lg:"90vh"}}>
        <Image
          margin={"auto"}
          src={errorpic}
        />
        <Heading color={"#F05941"}>404 : Something Went Wrong !!</Heading>
        <Button
          colorScheme="orange"
          borderRadius={"50px"}
          marginTop={"30px"}
          onClick={() => navigate("/")}
          leftIcon={<FaHome />}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default Error;
