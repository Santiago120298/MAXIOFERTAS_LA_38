import React from "react";

interface ExampleCarouselImageProps {
  text?: string;
  src?: string; // Propiedad opcional para una imagen
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({
  text,
  src,
}) => {
  return (
    <div
      style={{
        height: "500px", // Ajusta la altura según necesites
        width: "100%",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={text}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Mantiene la proporción de la imagen, pero la recorta si es necesario para llenar el contenedor
          }}
        />
      ) : (
        <h3>{text}</h3>
      )}
    </div>
  );
};

export default ExampleCarouselImage;
