import React from 'react';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";

function MyModal (props) {

    function handleModal() {
      props.setModal(false);
      props.getData();
    }

    function handleModalChange(event) {
      const {
        name,
        value
      } = event.target;
      props.setModalContent((prevVal) => {
        return {
          ...prevVal,
          [name]: value
        };
      });
    }

    async function saveUpdate() {
      const id = props.modalContent._id;
      const url = `http://localhost:5000/update/${id}` ;
      await axios.patch(url, props.modalContent)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      handleModal();
    }

    return (
            <Modal show={props.modal}>
                <Modal.Header onClick={handleModal} closeButton>
                    <Modal.Title>Form Mahasiswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Nama</label>
                            <input className="form-control" name="nama" onChange={handleModalChange}
                                placeholder={props.modalContent.nama} />
                        </div>
                        <div className="form-group">
                            <label>IPK</label>
                            <input className="form-control" name="ipk" onChange={handleModalChange}
                                placeholder={props.modalContent.ipk} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveUpdate}>Save Update</Button>
                    <Button variant="secondary" onClick={handleModal}>Close Modal</Button>
                </Modal.Footer>
            </Modal>
    )
}

export default MyModal;