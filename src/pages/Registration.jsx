import { useState, useEffect } from 'react';
import '../components/css/Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    registration: '',
    name: '',
    age: '',
    semester: '',
    shift: '',
    className: '',
    unitId: '',
    password: '',
    role: 'STUDENT'
  });

  const [units, setUnits] = useState([]); // guarda as unidades

  // Busca as unidades quando a página carrega
useEffect(() => {
  async function fetchUnits() {
    const token = localStorage.getItem('jwtToken'); // ou outro lugar onde você armazena o token

    try {
      const response = await fetch('http://localhost:8080/resisted/units/getunit', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUnits(data);
      } else {
        console.error('Erro ao buscar unidades:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na requisição de unidades:', error);
    }
  }

  fetchUnits();
}, []);


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
      name: formData.name,
      age: Number(formData.age),
      semester: formData.semester,
      shift: formData.shift,
      className: formData.className,
      unit: { id_unit: Number(formData.unitId) }, // <-- corrigido para id_unit
      password: formData.password,
      role: formData.role
    };
  
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Cadastro feito com sucesso:', data);
        // Limpar form ou redirecionar se quiser
      } else {
        console.error('Erro no cadastro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
    }
  };  

  return (
    <div className="cadastro-container">
      <h2>Cadastro do Aluno</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input className='input' type="text" name="name" placeholder="Digite seu nome" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Matrícula:
          <input className='input' type="text" name="registration" placeholder="Digite sua matrícula" value={formData.registration} onChange={handleChange} />
        </label>

        <label>
          Idade:
          <input className='input' type="number" name="age" placeholder="Digite sua idade" value={formData.age} onChange={handleChange} />
        </label>

        <label>
          Semestre:
          <input className='input' type="text" name="semester" placeholder="Digite seu semestre" value={formData.semester} onChange={handleChange} />
        </label>

        <label>
          Turno:
          <input className='input' type="text" name="shift" placeholder="Digite seu turno" value={formData.shift} onChange={handleChange} />
        </label>

        <label>
          Classe:
          <input className='input' type="text" name="className" placeholder="Digite sua classe" value={formData.className} onChange={handleChange} />
        </label>

        <label>
          Unidade:
          <select className='input' name="unitId" value={formData.unitId} onChange={handleChange}>
            <option value="">Selecione uma unidade</option>
            {units.map((unit) => (
              <option key={unit.id_unit} value={unit.id_unit}>
                {unit.name} {/* ou outro campo que represente o nome */}
              </option>
            ))}
          </select>
        </label>

        <label>
          Senha:
          <input className='input' type="password" name="password" placeholder="Digite sua senha" value={formData.password} onChange={handleChange} />
        </label>

        <div className="form-footer">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
