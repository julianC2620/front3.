import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";   

function FrontTiendaPaisa() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const fetchItems = async () => {
    const res = await axios.get("http://127.0.0.1:8000/items/");
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post("http://127.0.0.1:8000/items/", {
      name,
      description,
      price: parseFloat(price),
      tags: tags.split(",")
    });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/items/${id}`);
    fetchItems();
  };

  const recommendItems = async (tag) => {
    const res = await axios.get(`http://127.0.0.1:8000/recommend/${tag}`);
    alert("Recomendaciones: " + res.data.recommendations.join(", "));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tienda Paisa 🛒</h1>
      <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input placeholder="Descripción" onChange={e => setDescription(e.target.value)} />
      <input placeholder="Precio" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Tags (coma separada)" onChange={e => setTags(e.target.value)} />
      <button onClick={addItem}>Agregar</button>

      <h2>Productos</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <b>{item.name}</b> - ${item.price} <br />
            {item.description} <br />
            Tags: {item.tags}
            <br />
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
            <button onClick={() => recommendItems(item.tags.split(",")[0])}>Recomendar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FrontTiendaPaisa;
;

