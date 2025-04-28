import React, { useState } from 'react';
import '../components/css/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    registration: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      registration: Number(formData.registration),
      password: formData.password
    };
  
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
  
        // Salva o token no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('token_type', data.type);
        localStorage.setItem('token_expires', Date.now() + data.expiresIn);
  
        // Redireciona para a dashboard ou outra página
        window.location.href = '/dashboard'; // ajuste a rota conforme seu app
      } else {
        console.error('Erro no login:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }
  };
  
  return (
    <div className="login-container">
      <h2>Área de Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="registration">Matrícula:</label>
        <input
          type="text"
          id="registration"
          name="registration"
          placeholder="Digite sua matrícula"
          value={formData.registration}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="form-footer">
          <a href="#" className="esqueci-senha">Esqueci minha senha</a>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
