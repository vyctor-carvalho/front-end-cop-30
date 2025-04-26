import '../components/css/Registration.css';

function Registration() {
  return (
    <div className="cadastro-container">
            <h2>Cadastro do Aluno</h2>
      <form className="cadastro-form">
        <label>
          Nome:
          <input type="text" name="nome" placeholder="Digite seu nome" />
        </label>

        <label>
          Matrícula:
          <input type="text" name="matricula" placeholder="Digite sua matrícula" />
        </label>

        <label>
          Curso:
          <input type="text" name="curso" placeholder="Digite seu curso" />
        </label>

        <label>
          Email:
          <input type="email" name="email" placeholder="Digite seu e-mail" />
        </label>

        <label>
          Senha:
          <input type="password" name="senha" placeholder="Digite sua senha" />
        </label>
        <div className="form-fotter">
        <button type="submit">Entrar</button>
        </div>
      </form>
      
    </div>
    
  );
}

export default Registration;
