import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo from "../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemLS, getItemLS } from "../localStorage/localStorage";
import { logoutAction } from "../Redux/authReducer/action";
import { FaClipboardList, FaUser } from "react-icons/fa";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  //Navbar Sticky
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  //Redux Store
  const dispatch = useDispatch();
  const isAuth = getItemLS("auth")?.isAuth || false;
  const username = getItemLS("auth")?.username || "";

  //Logout Button
  const handleLogout = () => {
    navigate("/");
    dispatch(logoutAction());
  };

  return (
    <Box
      bg={"linear-gradient(#091216, #091216)"}
      padding={{ base: "10px 0px 10px 0px", md: "10px", lg: "10px" }}
      style={{ position: "sticky", top: 0, zIndex: 999 }}
      className={scroll ? "active-scroll" : ""}
    >
      <Container maxW={"8xl"}>
        <HStack justifyContent={"space-between"}>
          <Image
            src={logo}
            width={{ base: "40px", md: "80px", lg: "100px" }}
            marginLeft={{ base: "0px", md: "10px", lg: "20px" }}
            onClick={() => navigate("/")}
            cursor={"pointer"}
          />

          {/* Searchbar  */}
          {isAuth && <Searchbar />}




          {/* Authentication  */}
          {isAuth ? (
            <HStack
              spacing={{ base: "8px", md: "10px", lg: "20px" }}
              marginRight={{ base: "0px", md: "10px", lg: "20px" }}
            >
              {/* Notes  */}
              <Box color="#BE3144" fontSize={{base:"20px", md:"25px", lg:"25px"}} cursor={"pointer"} onClick={() => navigate("/notes")}>
                <FaClipboardList />
              </Box>

              {/* Profile  */}
              <Menu>
                <MenuButton as={Button} fontSize={{base:"15px", md:"17px", lg:"17px"}} padding={{base:"12px", md:"12px", lg:"12px"}} borderRadius={"50%"} bg={"#BE3144"} color={"white"}>
                 <FaUser />
                </MenuButton>
                <MenuList bg={"#BE3144"}>
                  <MenuGroup title= {`Hello, ${username}`} color={"white"}>
                    <MenuDivider />   
                    <MenuItem bg={"#BE3144"} color={"white"} onClick={handleLogout} _hover={{ bg: "gray.200", color: "red" }}> Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>

            </HStack>
          ) : (
            <HStack
              spacing={{ base: "10px", md: "10px", lg: "20px" }}
              marginRight={{ base: "0px", md: "10px", lg: "20px" }}
            >
              <Button
                color={"white"}
                border={"1px solid #279EFF"}
                variant={"outline"}
                borderRadius={"20px"}
                _hover={{
                  bg: "#279EFF",
                }}
                
                boxShadow={
                  "#40F8FF 0px 4px 2px -1px, #40F8FF 0px 2px 2px -1px"
                }
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              
            </HStack>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
