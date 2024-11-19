import React, { useState } from "react";
import "./FormLanche.css";

const url = "http://localhost:3000/lanches";

const FormLanche = () => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    ingredientes: "",
    categoria: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const clearForm = () => {
    setFormData({
      nome: "",
      preco: "",
      ingredientes: "",
      categoria: "",
      image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("nome", formData.nome);
    formDataToSend.append("preco", formData.preco);
    formDataToSend.append("ingredientes", formData.ingredientes);
    formDataToSend.append("categoria", formData.categoria);
    if (formData.image) {
      formDataToSend.append("imagem", formData.image);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to add lanche");
      }

      const data = await response.json();

      alert(`Lanche adicionado com sucesso! ID: ${data.id}`);

      clearForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Erro ao adicionar lanche");
    }
  };

  return (
    <div className="form-container">
      <div className="form-panel">
        <form className="form-FormLanche" onSubmit={handleSubmit}>
          <div className="field">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Preço:</label>
            <input
              type="number"
              step="0.1"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Ingredientes:</label>
            <textarea
              name="ingredientes"
              value={formData.ingredientes}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Categoria:</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Imagem:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Adicionar Lanche</button>
        </form>
      </div>
      <div className="image-panel">
        {formData.image && (
          <div className="image-preview">
            <h3>Imagem Selecionada:</h3>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormLanche;
