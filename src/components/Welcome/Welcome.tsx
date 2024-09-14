import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import api from '../../api/axios';
import axios from 'axios';
import './styles.css';

const Welcome: React.FC = () => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await api.get('/welcome', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        setError('Você não está autorizado. Por favor, faça login novamente.');
                        dispatch(logout());
                        localStorage.removeItem('token');
                    } else {
                        setError('Falha ao buscar dados do usuário: ' + error.message);
                    }
                } else {
                    setError('Erro desconhecido.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (auth.isAuthenticated) {
            fetchUser();
        } else {
            setError('Você precisa estar autenticado para acessar esta página.');
            setLoading(false);
        }
    }, [auth.isAuthenticated, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="welcome-container">
            {error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <button className="submit-button" onClick={handleLogout}>Login</button>
                </div>
            ) : (
                <div className="welcome-content">
                    <h1 className="welcome-title">Bem-vindo, {user?.name}!</h1>
                    <p className="welcome-email">Email: {user?.email}</p>
                    <button className="submit-button" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Welcome;
