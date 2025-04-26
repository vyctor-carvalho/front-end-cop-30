import React from 'react';
import '../components/css/Login.css';

function Login() {
  return (
    <div className="login-container">
<h2>Área de Login</h2>
      <form className='login-form'>
        <label htmlFor="matricula">Matrícula:</label>
        <input type="text" id="matricula" name="matricula" placeholder="Digite sua matrícula" required />

        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required />

        <div className="form-footer">
          <a href="#" className="esqueci-senha">Esqueci minha senha</a>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
