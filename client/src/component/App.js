import React,{useState} from 'react';
import axios from 'axios';
import './App.css';
import Form from "./Form";
import List from "./List";
import MyModal from "./Modal";

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

  function getData() {
    const url = 'http://localhost:5000/data';
    axios.get(url)
      .then((collections) => {
        setItems(collections.data);
      });
  }

  return (
  <div className="container">
    <Form 
    Content={Content} 
    getData={getData} 
    setContent={setContent} />
    
    <List 
    items={items} 
    getData={getData} 
    setModal={setModal} 
    setModalContent={setModalContent} />
    
    <MyModal 
    modalContent={modalContent} 
    modal={modal} 
    setModal={setModal} 
    setModalContent={setModalContent} />
  </div>
    )
}
export default App;

