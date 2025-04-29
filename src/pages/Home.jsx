import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setsearchName] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const fetchedPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          return {
            id: details.data.id,
            name: details.data.name,
            image: details.data.sprites.front_default,
            types: details.data.types.map((type) => type.type.name),
          };
        })
      );
      setPokemons(fetchedPokemons);
      setFilteredPokemons(fetchedPokemons);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // below fetching data
  useEffect(() => {
    getData();
  }, []);

  // Handle Search by Name
  const handleSearch = (e) => {
    setsearchName(e.target.value);
  };

  // Handle Type Filter
  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    let filtered = pokemons;

    if (searchName) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchName, selectedType, pokemons]);

  return (
    <div className="w-full px-4 py-8">
      <div className="flex justify-center gap-10 items-center mb-6">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchName}
          onChange={handleSearch}
          className="input input-bordered w-80"
        />
        <select
          onChange={handleTypeFilter}
          className="select select-bordered w-50"
        >
          <option value="">Filter by Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  id={pokemon.id}
                />
              ))
            ) : (
              <div className="col-span-full text-center">Pokemon not found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
