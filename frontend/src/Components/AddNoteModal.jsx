import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { addNotesAction, getNotesAction } from "../Redux/notesReducer/action";

const AddNoteModal = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [note, setNote] = useState({
    title:"",
    body:""
  });

  // Toast feature
  const toast = useToast();
  const positions = ["top"];

   //Redux Store
   const dispatch = useDispatch();
   const isLoading = useSelector((store) => store.notesReducer.isLoading);
   const message = useSelector((store) => store.notesReducer.addNoteMsg);
   const isError = useSelector((store) => store.notesReducer.isError);

   //handleChange
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setNote((prev)=>{
        return {...prev,
            [name]: value
        }
    })
  }

  const handleAdd = ()=>{
    if (note?.title && note?.body) {
        dispatch(addNotesAction(note)).then(()=>{
            toast({
                title: `Note added successfully ✅`,
                position: positions[0],
                isClosable: true,
                duration: 1000,
                status: "success",
              });
              dispatch(getNotesAction())
              onClose();
        })
      } else {
        toast({
          title: `Fill all the inputs !!`,
          position: positions[0],
          isClosable: true,
          duration: 1000,
          status: "warning",
        });
      }
  }

  if(isError){
    return <Error />
  }

  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#BE3144"} color={"white"}>
            Add Note
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} bg={"#091216"} color={"white"}>
            <FormControl>
              <FormLabel color={"red"}>Title</FormLabel>
              <Input type="text" ref={initialRef} placeholder="Title ..." name="title" value={note?.title} onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"green"}>Body</FormLabel>
              <Textarea
                placeholder="Enjoy your writing here ...."
                colorScheme="blue"
                name="body" value={note?.body} onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter  bg={"#091216"}>
            <Button
              bg="#BE3144"
              color={"white"}
              borderRadius={"50px"}
              _hover={{
                bg: "#8a2432",
              }}
              margin={"5px"}
              onClick={handleAdd}
              isLoading={isLoading}
            >
              Add
            </Button>
            <Button
              onClick={onClose}
              color={"white"}
              bg={"#e02c1f"}
              variant={"solid"}
              borderRadius={"50px"}
              _hover={{
                bg: "#b5271d",
              }}
              margin={"5px"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNoteModal;
