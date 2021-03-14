import React from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

const NewModal = (props) => {
    return (
        <div>
            <Modal
                size={props.size}
                show={props.show}
                onHide={props.handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewModal;