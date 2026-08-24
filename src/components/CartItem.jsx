import { BsTrash } from "react-icons/bs";

const CartItem = ({ item, eliminar }) => {
    return (
        <div className="cart-item">
            <img 
                src={item.imagen} 
                alt={item.nombre} 
                className="imagenproducto" 
            />
            
            <div className="cart-item-info">
                {/* Agrupamos cada par en un div */}
                <div className="info-group">
                    <p className="DescripcionElemento">Nombre:</p>
                    <p>{item.nombre}</p>
                </div>
                
                <div className="info-group">
                    <p className="DescripcionElemento">Precio unidad:</p>
                    <p>${item.precio}</p>
                </div>
                
                <div className="info-group">
                    <p className="DescripcionElemento">Cantidad:</p>
                    <p>{item.cantidad}</p>
                </div>
                
                <div className="info-group">
                    <p className="DescripcionElemento" style={{ color: "#28a745" }}>Precio final:</p>
                    <p style={{ color: "#28a745", fontWeight: "bold" }}>${item.precio * item.cantidad}</p>
                </div>
            </div>

            <button onClick={() => eliminar(item.id)}>
                <BsTrash size={20} color="white" />
            </button>
        </div>
    );
};

export default CartItem;