import React, { useState } from 'react';
import './styles.css';
import api from '../../api/axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import logo from '../../assets/fbenevides.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await api.post('/login', { email, password });
      const { token, name } = response.data;

      localStorage.setItem('token', token);
      dispatch(login({ name, email, token }));

      window.location.href = '/';
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Login</h1>
        {error && <p className="error-message">{error}</p>}
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
        <button type="button" className="submit-button" onClick={handleLogin}>
          Entrar
        </button>
        <p className="register-link">
          Não tem uma conta? <a href="/register" className="link">Registre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
