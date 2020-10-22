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

    function handleGet (event){
      const url = 'http://localhost:5000/data';
      axios.get(url)
      .then((collections) => {
        setItems(collections.data) 
      })
      event.preventDefault();
      // console.log(collections.data);
    }
    
    return (
      <div className="container">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Nama</label>
            <input class="form-control" onChange={contentChange} name="nama" placeholder="Nama Anda"
              value={Content.nama} />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">IPK</label>
            <input class="form-control" onChange={contentChange} name="ipk" placeholder="IPK Anda"
              value={Content.ipk} />
          </div>
          <button onClick={handlePost} class="btn btn-primary">Tambah</button>
          <button onClick={handleGet}class="btn btn-primary">Lihat</button>
        </form>

        <ul className="list-group">
          {
          items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>{item.nama}
            <span class="badge badge-primary badge-pill">{item.ipk}</span>
          </li>
          ))
          }
        </ul>

      </div>
    )
}
export default App;

