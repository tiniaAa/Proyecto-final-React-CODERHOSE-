import { useState } from 'react';
import LoginAdmin from './LoginAdmin';
import AdminContainer from './AdminContainer';

const VistaAdmin = () => {
    // Revisamos si ya existe el token al cargar la página
    const [logueado, setLogueado] = useState(!!localStorage.getItem('token'));

    // Si NO está logueado, mostramos el login
    if (!logueado) {
        return <LoginAdmin onLoginExitoso={() => setLogueado(true)} />;
    }

    // Si ESTÁ logueado, mostramos el panel directamente
    return <AdminContainer />;
};

export default VistaAdmin;