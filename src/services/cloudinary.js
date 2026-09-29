export const uploadToCloudinary = async (file) => {
    // REEMPLAZAR ESTOS DOS VALORES CON LOS DE TU CUENTA
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Error al subir la imagen a Cloudinary");

        const data = await response.json();
        
        // Retornamos el link público y seguro que genera Cloudinary (empieza con https://res.cloudinary...)
        return data.secure_url; 
    } catch (error) {
        console.error("Fallo la subida:", error);
        throw error;
    }
};