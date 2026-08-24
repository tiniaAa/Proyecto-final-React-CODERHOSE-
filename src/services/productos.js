import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "./firebaseConfig";


export const getProductos = (type) => {
    
    const productosRef = collection(dataBase, "productos");
    
    // Evaluamos ANTES de hacer la petición
    // Si hay type, armamos la query con where. Si no, usamos la colección entera.
    const consulta = type 
        ? query(productosRef, where('categoria', '==', type))
        : productosRef;

    // Hacemos un solo return que SIEMPRE devuelve una Promesa
    return getDocs(consulta)
        .then((snapshot) => {
            if (snapshot.empty) return [];
            
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        })
        .catch((error) => {
            throw new Error("Error al consultar Firebase: " + error.message);
        });
}

export const getOneProductos = (id) => {
    // 1. Creamos la referencia DIRECTA al documento. No usamos 'query' ni 'where' acá.
    const docRef = doc(dataBase, "productos", id);

    // 2. Ejecutamos la petición para traer SOLO ese documento
    return getDoc(docRef)
        .then((snapshot) => {
            // 3. getDoc no devuelve un array. Usamos .exists() para verificar si el ID es real.
            if (snapshot.exists()) {
                return { 
                    id: snapshot.id, 
                    ...snapshot.data() 
                };
            } else {
                throw new Error("Producto no encontrado en la base de datos");
            }
        })
        .catch((error) => {
            throw new Error("Error al obtener el producto: " + error.message);
        });
}
