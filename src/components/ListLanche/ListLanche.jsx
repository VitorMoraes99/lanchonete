import React, { useState, useEffect } from 'react';
import './ListLanche.css';

const url = 'http://localhost:3000/lanchonete';

const ListLanche = () => {
    const [lanches, setLanches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLanche, setSelectedLanche] = useState(null);
    const [formData, setFormData] = useState({ nome: '', ingredientes: '', preco: '', categoria: '', image: '' });

    useEffect(() => {
        const fetchLanches = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Falha ao tentar ler os lanches');
                }
                const data = await response.json();
                setLanches(data.lanches);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLanches();
    }, []);

    const deleteLanche = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao excluir o lanche');
            }
            setLanches(lanches.filter((lanche) => lanche.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (lanche) => {
        setSelectedLanche(lanche);
        setFormData({ ...lanche });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
    };

    const updateLanche = async () => {
        try {
            const response = await fetch(`${url}/${selectedLanche.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Falha ao atualizar o lanche');
            }
            setLanches(lanches.map((lanche) => (lanche.id === selectedLanche.id ? formData : lanche)));
            setSelectedLanche(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Carregando lanches...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="lanche-list-container">
            <h2>Lista de Lanches</h2>
            {lanches.length === 0 ? (
                <p>Nenhum lanche encontrado :</p>
            ) : (
                <table className="lanche-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ingredientes</th>
                            <th>Preço</th>
                            <th>Categoria</th>
                            <th>Imagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lanches.map((lanche) => (
                            <tr key={lanche.id}>
                                <td>{lanche.nome}</td>
                                <td>{lanche.ingredientes}</td>
                                <td>R$ {lanche.preco}</td>
                                <td>{lanche.categoria}</td>
                                <td>
                                    {lanche.image && (
                                        <img
                                            src={`http://localhost:3000/${lanche.image}`}
                                            alt={`Imagem de ${lanche.nome}`}
                                            className="lanche-image"
                                        />
                                    )}
                                </td>
                                <td className="button-group">
                                    <button className="edit-button" onClick={() => handleEditClick(lanche)}>Editar</button>
                                    <button className="delete-button" onClick={() => deleteLanche(lanche.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedLanche && (
                <div className="edit-form">
                    <h3>Editar Lanche</h3>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Nome"
                    />
                    <input
                        type="text"
                        name="ingredientes"
                        value={formData.ingredientes}
                        onChange={handleInputChange}
                        placeholder="Ingredientes"
                    />
                    <input
                        type="number"
                        name="preco"
                        value={formData.preco}
                        onChange={handleInputChange}
                        placeholder="Preço"
                    />
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        placeholder="Categoria"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="button-group">
                        <button className="save-button" onClick={updateLanche}>Salvar</button>
                        <button className="cancel-button" onClick={() => setSelectedLanche(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListLanche;
