import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/publications.css';

function Publications() {
  const [publications, setPublications] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher/masquer le formulaire
  const [searchQuery, setSearchQuery] = useState(""); // État pour la barre de recherche

  const token = localStorage.getItem("token");

  // Récupération des publications
  const fetchPublications = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/publications");
      setPublications(response.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // Création ou mise à jour des publications
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/publications/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5001/api/publications", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ title: "", content: "" });
      fetchPublications();
      setIsFormVisible(false); // Masquer le formulaire après soumission
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  // Suppression des publications
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/publications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPublications(); // Rafraîchir les publications après suppression
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed: " + error.response?.data?.message || error.message);
    }
  };
  
  

  // Filtrage des publications selon la recherche
  const filteredPublications = publications.filter((publication) =>
    publication.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="publications-container">
      <h2>Publications</h2>
      
      {/* Barre de recherche */}
      <div className="header-row">
        <input
          type="text"
          placeholder="Search publications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button
          className="add-button"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingId(null); // Réinitialise l'édition
            setFormData({ title: "", content: "" }); // Réinitialise les données du formulaire
          }}
        >
          +
        </button>
      </div>

      {/* Formulaire de création/édition de publication */}
      {isFormVisible && (
        <form onSubmit={handleCreateOrUpdate} className="publication-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            required
          />
          <button type="submit">{editingId ? "Update" : "Create"}</button>
        </form>
      )}

      {/* Liste des publications filtrée */}
      <ul className="publications-list">
        {filteredPublications.map((publication) => (
          <li key={publication._id} className="publication-item">
            <h3>{publication.title}</h3>
            <p>{publication.content}</p>
            <button
              onClick={() => {
                setEditingId(publication._id);
                setFormData({
                  title: publication.title,
                  content: publication.content,
                });
                setIsFormVisible(true); // Affiche le formulaire pour l'édition
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(publication._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Publications;
