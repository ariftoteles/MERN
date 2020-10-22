import React,{useState} from 'react';
import axios from 'axios';
import './App.css'

function App (){
    const [Content, setContent] = useState({
      nama: "",
      ipk: ""
    });
    const [items, setItems] = useState([]);

    function contentChange(event) {
      const {name,value} = event.target;
      setContent((prevVal) => {
        return {
          ...prevVal,
          [name]: value
        };
      });
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

    function getData() {
      const url = 'http://localhost:5000/data';
      axios.get(url)
      .then((collections) => {
        setItems(collections.data) ;
        console.log(collections.data);
      });
    }

    function handleGet (event){
      getData();
      event.preventDefault();
    }

    function handleDelete (event){
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
          </li>
          ))
          }
        </ul>

      </div>
    )
}
export default App;

