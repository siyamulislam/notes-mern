import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Image,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, getNotesAction } from "../Redux/notesReducer/action";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import AddNoteModal from "../Components/AddNoteModal";
import UpdateModal from "../Components/UpdateModal";

const Notes = () => {
  //single note to edit
  const [singleNote, setSingleNote] = useState({});
  const [sortBy, setSortBy] = useState("newest");


  //AddNoteModal
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  //UpdateNote Modal
  const {
    isOpen: isAddNoteOpen,
    onOpen: onAddNoteOpen,
    onClose: onAddNoteClose,
  } = useDisclosure();

  //Toast
  const toast = useToast();

  //Redux Store
  const dispatch = useDispatch();
  const data = useSelector((store) => store.notesReducer.data) || [];
  const isLoading = useSelector((store) => store.notesReducer.isLoading);
  const isError = useSelector((store) => store.notesReducer.isError);

  useEffect(() => {
    dispatch(getNotesAction("", sortBy));
  }, [sortBy]);

  //handleDelete
  const handleDeleteBTN = (id) => {
    dispatch(deleteNoteAction(id)).then((res) => {
      toast({
        title: "Deleted successfully",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      dispatch(getNotesAction());
    });
  };

  //handleEdit
  const handleEditBTN = (item) => {
    setSingleNote(item);
    onUpdateOpen();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Box
      bg={"linear-gradient(#091216, #872341)"}
      padding={"20px"}
      color={"white"}
      minH={"82vh"}
    >
      {/* Add Note Icon  */}
      <Image
        src="https://img.icons8.com/?size=1x&id=IA4hgI5aWiHD&format=png"
        width={{ base: "40px", md: "60px", lg: "60px" }}
        borderRadius={"50%"}
        _hover={{
          bg: "#29ADB2",
        }}
        boxShadow={"#29ADB2 0px 0px 10px 5px"}
        cursor={"pointer"}
        style={{ position: "fixed", zIndex: 50, right: "30px", bottom: "30px" }}
        onClick={onAddNoteOpen}
      />

      {/* Sort By  */}
      <Container  maxW={"7xl"} display={"flex"} justifyContent={"flex-end"}>
        <Select width={"200px"} name="sort" value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
          <option style={{color:"#BE3144"}} value='newest'>Sort by : Newest</option>
          <option style={{color:"#BE3144"}} value='oldest'>Sort by : Oldest</option>
        </Select>
      </Container>

      <Container
        maxW={"7xl"}
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fill, minmax(250px, 1fr))"}
        gap={8}
        alignItems={"start"}
        alignContent={"flex-start"}
        margin={"25px auto 20px auto"}
      >
        {data?.map((item) => {
          return (
            <Card
              key={item?._id}
              item={item}
              handleDeleteBTN={handleDeleteBTN}
              handleEditBTN={handleEditBTN}
            />
          );
        })}
      </Container>

      {/* AddNote Modal */}
      <AddNoteModal isOpen={isAddNoteOpen} onClose={onAddNoteClose} />
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        singleNote={singleNote}
      />
    </Box>
  );
};

export default Notes;
