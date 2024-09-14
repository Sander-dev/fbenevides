import React, { useState } from 'react';
import api from '../../api/axios';
import './styles.css';
import logo from '../../assets/fbenevides.png';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    try {
      await api.post('/register', { name, email, password });
      alert('Registro bem-sucedido!');
      window.location.href = '/login';
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Registre-se</h1>
        <label className="input-label">
          Nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="input-field"
            required
          />
        </label>
        <label className="input-label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="input-field"
            required
          />
        </label>
        <label className="input-label">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="input-field"
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="button" className="submit-button" onClick={handleRegister}>
          Registrar
        </button>
        <p className="register-link">
          Já tem uma conta? <a href="/login" className="link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
