import React, { useEffect, useState } from "react";
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
import {  getNotesAction, upateNotesAction } from "../Redux/notesReducer/action";


const initialState = {
  _id: "",
  title: "",
  body: "",
  userID: "",
  username: "",
};

const UpdateModal = ({ isOpen, onClose, singleNote }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [note, setNote] = useState(initialState);

  useEffect(() => {
    setNote((prev) => {
      return { ...prev, ...singleNote };
    });
  }, [singleNote]);


  // Toast feature
  const toast = useToast();
  const positions = ["top"];

  //Redux Store
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.notesReducer.isLoading);
  const message = useSelector((store) => store.notesReducer.updateNoteMsg);
  const isError = useSelector((store) => store.notesReducer.isError);

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //handleUpdate
  const handleUpdate = () => {
    if (note?.title && note?.body) {
        dispatch(upateNotesAction(note)).then(()=>{
          toast({
            title: `Updated successfully`,
            position: positions[0],
            isClosable: true,
            duration: 1000,
            status: "success",
          });
          dispatch(getNotesAction());
          onClose();
        })
      }
  };

  if (isError) {
    return <Error />;
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
            Make the changes
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} bg={"#22092C"} color={"white"}>
            <FormControl>
              <FormLabel color={"red"}>Title</FormLabel>
              <Input
                type="text"
                ref={initialRef}
                placeholder="Title ..."
                name="title"
                value={note?.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"green"}>Body</FormLabel>
              <Textarea
                placeholder="Enjoy your writing here ...."
                colorScheme="blue"
                name="body"
                value={note?.body}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter bg={"#22092C"}>
            <Button
              bg="#29ADB2"
              color={"white"}
              borderRadius={"50px"}
              _hover={{
                bg: "#0766AD",
              }}
              margin={"5px"}
              onClick={handleUpdate}
              isLoading={isLoading}
            >
              Update
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

export default UpdateModal;
