import { Carousel } from 'react-bootstrap';

const Inicio = () => {
    return (
        <main className="inicio-container">
            {/* Sección Hero / Presentación */}
            <section className="inicio-hero">
                <div className="inicio-brand">
                    <span className="inicio-subtitle">Essentials & Comfort</span>
                    <h1>AMMA INTIMATES</h1>
                    <div className="inicio-divider"></div>
                </div>
                <div className="inicio-logo-wrapper">
                    <img src="./img/logoAmma.jpeg" alt="Logo de Amma Intimates" className="imagenINICIO" />
                </div>
            </section>
            
            {/* Sección de Manifiesto / Descripción */}
            <section className="inicio-about">
                <p>
                    Vendemos piezas pensadas en la suavidad y el confort diario. 
                </p>
            </section>
            
            {/* Sección de Carrusel Destacado */}
            <section className="inicio-carousel-section">
                <div className="carruselFlex">
                    <Carousel fade interval={4000} pause="hover">
                        <Carousel.Item>
                            <div className="carousel-img-container">
                                <img 
                                    className="d-block w-100" 
                                    src="./img/ConjuntoBeigePastel.jpeg" 
                                    alt="Conjunto Beige Pastel" 
                                />
                            </div>
                            <Carousel.Caption className="custom-caption">
                                <h3>Conjunto Beige Pastel</h3>
                                <p>Delicadeza y comodidad en su máxima expresión.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        
                        <Carousel.Item>
                            <div className="carousel-img-container">
                                <img 
                                    className="d-block w-100" 
                                    src="./img/Medias.jpeg" 
                                    alt="Medias" 
                                />
                            </div>
                            <Carousel.Caption className="custom-caption">
                                <h3>Accesorios & Detalles</h3>
                                <p>Complementos suaves para todos los días.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        
                        <Carousel.Item>
                            <div className="carousel-img-container">
                                <img 
                                    className="d-block w-100" 
                                    src="./img/PackBombacha.jpeg" 
                                    alt="Pack Bombacha" 
                                />
                            </div>
                            <Carousel.Caption className="custom-caption">
                                <h3>Packs Essenciales</h3>
                                <p>Versatilidad y diseño atemporal.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>
        </main>
    );
};

export default Inicio;