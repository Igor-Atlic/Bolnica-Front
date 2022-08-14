import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CustomModalAnswer(props) {
  const { title, content, toggleModal, isOpen, className, handleClick } = props;
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal} className={className}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggleModal();
              if (handleClick) handleClick();
            }}
          >
            Potvrdi
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Otkazi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomModalAnswer;
