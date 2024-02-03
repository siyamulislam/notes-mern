import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FaSistrix } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { getNotesAction } from '../Redux/notesReducer/action';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate()

    //Redux
    const dispatch = useDispatch()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate("/notes")
            dispatch(getNotesAction(title, "newest"))
        }
    };

    const handleSearchIcon = ()=>{
      navigate("/notes")
      dispatch(getNotesAction(title))
    }




  return (
    <InputGroup size='md' width={"300px"}>
    <Input
      border={"1px solid #BE3144"}
      color={"#F05941"}
      pr='4.5rem'
      type="text"
      placeholder='Title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <InputRightElement width={{ base: "30px", md: "50px", lg: "50px" }} color={"white"} bg={"#BE3144"} borderRadius={"0px 5px 5px 0px"} onClick={handleSearchIcon} cursor={"pointer"}>
      <FaSistrix />
    </InputRightElement>
  </InputGroup>
  )
}

export default Searchbar
