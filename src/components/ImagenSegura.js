import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

/**
 * Un componente que renderiza una imagen, pero si falla al cargar,
 * se oculta a sí mismo para no mostrar un ícono de imagen rota.
 *
 * @param {object} props - Las props del componente.
 * @param {string} props.src - La URL de la imagen a cargar.
 * @param {string} props.alt - El texto alternativo para la imagen.
 */

const ImagenSegura = ({ src, alt, width, height, ...props }) => {
  const [huboError, setHuboError] = useState(false);

  // Si el `src` de la imagen cambia, reseteamos el estado de error.
  useEffect(() => {
    setHuboError(false);
  }, [src]);

  const handleError = () => {
    setHuboError(true);
  };

  // Si hubo un error, no renderizamos nada (retornamos null).
  if (huboError) {
    // Opción 1 (la que pides): No mostrar nada.
    return null;

    // Opción 2 (alternativa): Mostrar una imagen de reemplazo.
    // return <img src="https://via.placeholder.com/150" alt="Imagen no disponible" {...props} />;
  }

  // Si todo está bien, mostramos la imagen.
  return (
    <Image
      src={src}
      alt={alt}
      width={(1920 / 2) * 0.75} // Reducción del 25%
      height={(1280 / 2) * 0.75} // Reducción del 25%
      onError={handleError} // ¡Esta es la clave!
      {...props} // Pasa cualquier otra prop como style, className, etc.
    />
  );
};
ImagenSegura.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ImagenSegura;
