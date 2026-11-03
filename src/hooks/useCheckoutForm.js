import { useState } from "react"

export const useCheckoutForm=(ValoresIniciales={} )=>{
    const[Comprador,setComporador]= useState({
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        tipoEnvio:'',
        metodoPago:'',
        direccion:'',
        provincia:'',
        ciudad:'',
        codigoPostal:'',
        ...ValoresIniciales
    })

    const [errores,setErrores] = useState({});
    const HandleChange =(e)=>{
        const {name,value} = e.target;
        setComporador(prev=>({...prev,[name]: value}))
         if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: null }));
        }


    }

    const ValidarFormulario=()=>{
        const nuevosErrores = {};
        // Validaciones Generales Obligatorias
        if (!Comprador.nombre.trim() || Comprador.nombre.trim().length < 2) {
            nuevosErrores.nombre = "Ingresá un nombre válido (mínimo 2 letras).";
        }
        if (!Comprador.apellido.trim() || Comprador.apellido.trim().length < 2) {
            nuevosErrores.apellido = "Ingresá un apellido válido.";
        }
        
        // Email: formato estándar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Comprador.email)) {
            nuevosErrores.email = "Ingresá un correo electrónico válido.";
        }
        // Teléfono: solo números, mínimo 8 dígitos (ej: celular argentino sin 0 ni 15)
        const telLimpio = Comprador.telefono.replace(/[\s-]/g, '');
        if (!/^\d{8,15}$/.test(telLimpio)) {
            nuevosErrores.telefono = "Ingresá un teléfono válido (entre 8 y 15 dígitos numéricos).";
        }
        if (!Comprador.tipoEnvio) {
            nuevosErrores.tipoEnvio = "Seleccioná el tipo de entrega.";
        }
        if (!Comprador.metodoPago) {
            nuevosErrores.metodoPago = "Seleccioná un método de pago.";
        }
        // Validaciones CONDICIONALES si es Envío a Domicilio
        if (Comprador.tipoEnvio === 'domicilio') {
            if (!Comprador.direccion.trim() || Comprador.direccion.trim().length < 5) {
                nuevosErrores.direccion = "Ingresá una dirección real (calle y altura).";
            }
            if (!Comprador.ciudad.trim()) {
                nuevosErrores.ciudad = "Ingresá tu ciudad o localidad.";
            }
            if (!Comprador.provincia.trim()) {
                nuevosErrores.provincia = "Ingresá tu provincia.";
            }
            // Código postal argentino: números de 4 dígitos o formato nuevo (ej: B1900)
            if (!/^[a-zA-Z]?\d{4}[a-zA-Z]{0,3}$/.test(Comprador.codigoPostal.trim())) {
                nuevosErrores.codigoPostal = "Código postal inválido.";
            }
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }
    return { Comprador, errores, HandleChange, ValidarFormulario };
}