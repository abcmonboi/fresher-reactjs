import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalConfirm = (props) => {
  const { handleClose, show, userInfo, handleUpdateUsers } = props;

  const confirmDelete = () => {
    handleClose();
    handleUpdateUsers(userInfo);
  };

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5> Are you sure you want to delete this user?</h5>
          <span>
            User: <b>{userInfo.first_name}</b>
          </span>
          <br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
