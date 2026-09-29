import { useState } from 'react';
import LoginAdmin from './LoginAdmin';
import AdminContainer from './AdminContainer';
const VistaAdmin = () => {
    // Usamos sessionStorage: la sesión muere cuando cerrás la pestaña
    const [logueado, setLogueado] = useState(!!sessionStorage.getItem('token'));
    if (!logueado) {
        return <LoginAdmin onLoginExitoso={() => setLogueado(true)} />;
    }
    return <AdminContainer />;
};
export default VistaAdmin;