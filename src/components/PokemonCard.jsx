import React from "react";

const PokemonCard = ({ name, image, types, id }) => {
  // console.log(types[0]);

  return (
    <div className="card bg-base-300 w-80 shadow-md hover:shadow-lg transition duration-300 rounded-lg">
      <figure className="h-48 overflow-hidden flex justify-center items-center">
        <img
          src={image}
          alt={name}
          className="w-auto h-36 object-contain" // Adjusted styles
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base-content">{name}</h2>
        <p className="text-base-content">ID: {id}</p>
        <div className="card-actions justify-between">
          <div className="flex gap-2">
            {types.map((type, index) => (
              <div
                key={index}
                className="badge badge-soft badge-accent"
                style={{ fontWeight: "bold", fontSize: "12px" }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
