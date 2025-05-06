import React, { useState } from "react";
import axios from "axios";
import './styles/theme.css';


function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données de formulaire à l'API
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
  
      // Sauvegarde du token dans le localStorage si login réussi
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (error) {
      // Vérification de l'existence de error.response et de message d'erreur
      if (error.response && error.response.data && error.response.data.message) {
        alert("Login failed: " + error.response.data.message);
      } else {
        // Si l'API ne renvoie pas de message d'erreur ou que la réponse est invalide
        alert("Login failed: An unexpected error occurred.");
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
