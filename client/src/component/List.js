import React from "react";
import axios from 'axios';

function List(props) {
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
    props.getData();
  }

  function handleUpdate(event) {
    const id = event.target.id;
    const url = `http://localhost:5000/update/${id}`;
    axios.get(url)
      .then((collections) => {
        props.setModalContent(collections.data);
      });
    props.setModal(true);
  }

    return (
        <ul className="list-group">
          {
          props.items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id}>{item.nama}
            <span className="badge badge-primary badge-pill">{item.ipk}</span>
            <button id={item._id} className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
            <button id={item._id} className="btn btn-outline-success btn-sm" onClick={handleUpdate}>Update</button>
          </li>
          ))
          }
        </ul>
    )
}

export default List;