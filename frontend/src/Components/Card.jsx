import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaFeather, FaEllipsisV } from "react-icons/fa";
import NoteViewModal from "./NoteViewModal";
import moment from 'moment';

 //generate random colors
function getRandomLightColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const Card = ({ item, handleDeleteBTN, handleEditBTN }) => {

  const { isOpen:isOpenAlert, onOpen:OnOpenAlert, onClose:onCloseAlert } = useDisclosure()
  const { isOpen:isOpenView, onOpen:onOpenView, onClose:onCloseView } = useDisclosure()
  const cancelRef = React.useRef()

  const bgColor = getRandomLightColor()
  const formattedDate = moment(item.createdAt).format('DD/MM/YYYY');


  const handleDelete = () => {
    handleDeleteBTN(item?._id);
  };

  const handleEdit = () => {
    handleEditBTN(item);
  };

 
 

  return (
    <VStack alignItems={"flex-start"} gap={"0px"} borderRadius={"0px 0px 10px 10px"} boxShadow={`${bgColor} 0px 1px 2px 0px, ${bgColor} 0px 1px 3px 1px`} transition={".3s ease-in-out 0s"}
    _hover={{
      transform: "scale(1.02)",
    }}>

      {/* Header  */}
      <HStack bg={bgColor} width={"100%"} justifyContent={"space-between"} alignItems={"center"} padding={"5px 10px 5px 10px"}>
        <HStack gap={"10px"} color={"white"}>
          <FaFeather />
          <Heading size={"sm"} fontWeight={"semibold"} color={"white"} textAlign={"left"}>
            {item?.title.toUpperCase()}
          </Heading>
        </HStack>

          <Menu style={{border:"1px solid red", bg:"red"}}>
            <MenuButton as={Button} w={"10px"} style={{background:"transparent", color:"white"}}>
            <FaEllipsisV />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleEdit} color={"black"}>Edit</MenuItem>
                <MenuItem onClick={OnOpenAlert} color={"red"}>Delete</MenuItem>
            </MenuList>
          </Menu>
      </HStack>

      {/* Body  */}
      <Box width={"100%"} onClick={onOpenView} bg={"#22092C"} color={"white"} height={"250px"} padding={"10px"} overflow={"hidden"} cursor={"pointer"}>
        <Text textAlign={"justify"}>{item?.body}</Text>
      </Box>

      {/* Date  */}
      <Box width={"100%"} bg={"#22092C"} padding={"5px 0px 5px 10px"} borderRadius={"0px 0px 10px 10px"}>
        <Text fontSize={"10px"} color={"gray.500"} textAlign={"left"}>{formattedDate}</Text>
      </Box>

      {/* Edit and Delete Menu  */}
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='md' fontWeight='semibold' bg={"#22092C"} color={"red"}>
              Delete permanently?
            </AlertDialogHeader>
            <AlertDialogBody bg={"#22092C"} color={"red"}>
              Are you sure? <span style={{color:"white"}}>"{item.title.toUpperCase()}"</span> cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter bg={"#22092C"}>
              <Button colorScheme='red' onClick={handleDelete} >
                Delete
              </Button>
              <Button ref={cancelRef} onClick={onCloseAlert} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* View Details Modal  */}
      <NoteViewModal isOpen={isOpenView} onClose={onCloseView} item={item} />

    </VStack>
  );
};

export default Card;
