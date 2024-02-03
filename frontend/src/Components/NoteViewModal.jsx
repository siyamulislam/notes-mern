import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const NoteViewModal = ({isOpen, onClose , item}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#BE3144"} color={"white"}>{item.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={"#091216"} color={"white"}>
            {item.body}
          </ModalBody>

          <ModalFooter bg={"#091216"}>
            <Button colorScheme='red' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default NoteViewModal
