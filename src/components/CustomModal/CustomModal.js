import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function CustomModal(props) {
  const { title, content, toggleModal, isOpen, className, handleClick } = props;
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal} className={className}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              toggleModal();
              if (handleClick) handleClick();
            }}
          >
            Zatvori
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomModal;
