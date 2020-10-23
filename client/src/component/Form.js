import React from "react";
import axios from 'axios';

function Form (props) {

  function contentChange(event) {
    const {name,value} = event.target;
    props.setContent((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      };
    });
  }

  function handleGet(event) {
    props.getData();
    event.preventDefault();
  }

  function handlePost(event) {
    event.preventDefault();
    const url = 'http://localhost:5000/data';
    axios.post(url, {
      nama: props.Content.nama,
      ipk: props.Content.ipk
    });
    props.setContent({
      nama: "",
      ipk: ""
    });
  }

    return (
        <form>
        <div className="form-group">
          <label>Nama</label>
          <input className="form-control" onChange={contentChange} name="nama" placeholder="Nama Anda"
            value={props.Content.nama} />
        </div>
        <div className="form-group">
          <label>IPK</label>
          <input className="form-control" onChange={contentChange} name="ipk" placeholder="IPK Anda"
            value={props.Content.ipk} />
        </div>
        <button onClick={handlePost} className="btn btn-primary">Tambah</button>
        <button onClick={handleGet}className="btn btn-primary">Lihat</button>
      </form>
    )
}

export default Form;