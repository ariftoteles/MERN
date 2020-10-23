import React,{useState} from 'react';
import axios from 'axios';
import './App.css'
import { Modal, Button } from "react-bootstrap";
function App() {
  const [Content, setContent] = useState({
    nama: "",
    ipk: ""
  });
  const [modalContent, setModalContent] = useState({
    _id: "",
    nama: "",
    ipk: ""
  })
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false)

  function contentChange(event) {
    const {name,value} = event.target;
    setContent((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      };
    });
  }

  function getData() {
    const url = 'http://localhost:5000/data';
    axios.get(url)
      .then((collections) => {
        setItems(collections.data);
      });
  }

  function handleGet(event) {
    getData();
    event.preventDefault();
  }

  function handlePost(event) {
    event.preventDefault();
    const url = 'http://localhost:5000/data';
    axios.post(url, {
      nama: Content.nama,
      ipk: Content.ipk
    });
    setContent({
      nama: "",
      ipk: ""
    });
  }

  function handleDelete(event) {
    const id = event.target.id;
    const url = `http://localhost:5000/delete/${id}`;
    axios.delete(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    getData();
  }

  function handleUpdate(event) {
    const id = event.target.id;
    const url = `http://localhost:5000/update/${id}`;
    axios.get(url)
      .then((collections) => {
        setModalContent(collections.data);
      });
    setModal(true);
  }

  function handleModal() {
    setModal(false);
  }

  function handleModalChange(event) {
    const {name,value} = event.target;
    setModalContent((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      };
    });
  }

  function saveUpdate(event) {
    const id = modalContent._id;
    const url = `http://localhost:5000/update/${id}`;
    axios.patch(url, modalContent)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setModal(false);
  }

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Nama</label>
            <input className="form-control" onChange={contentChange} name="nama" placeholder="Nama Anda"
              value={Content.nama} />
          </div>
          <div className="form-group">
            <label>IPK</label>
            <input className="form-control" onChange={contentChange} name="ipk" placeholder="IPK Anda"
              value={Content.ipk} />
          </div>
          <button onClick={handlePost} className="btn btn-primary">Tambah</button>
          <button onClick={handleGet}className="btn btn-primary">Lihat</button>
        </form>

        <ul className="list-group">
          {
          items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id}>{item.nama}
            <span className="badge badge-primary badge-pill">{item.ipk}</span>
            <button id={item._id} className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
            <button id={item._id} className="btn btn-outline-success btn-sm" onClick={handleUpdate}>Update</button>
          </li>
          ))
          }
        </ul>
        {/* Modal */}
        <Modal show={modal}>
          <Modal.Header onClick={handleModal} closeButton>
            <Modal.Title>Form Mahasiswa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Nama</label>
                <input className="form-control" name="nama" onChange={handleModalChange}
                  placeholder={modalContent.nama} />
              </div>
              <div className="form-group">
                <label>IPK</label>
                <input className="form-control" name="ipk" onChange={handleModalChange}
                  placeholder={modalContent.ipk} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={saveUpdate}>Save Update</Button>
            <Button variant="secondary" onClick={handleModal}>Close Modal</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
}
export default App;

