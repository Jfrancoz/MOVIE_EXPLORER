import { useState, useEffect } from "react";

const API_URL = "http://www.omdbapi.com/?apikey=efaf5f7f";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  const searchMovies = async () => {
    let url = `${API_URL}&s=${searchTerm}`;
    if (year) url += `&y=${year}`;
    if (type) url += `&type=${type}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center py-6">
      {/* Header */}
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">🎬 Movie Explorer</h1>
        <p className="text-gray-400">Descubre y busca tus películas favoritas</p>
      </header>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl px-4 mb-6">
        <input
          type="text"
          className="w-full sm:w-2/3 p-3 text-gray-900 rounded-lg focus:outline-none"
          placeholder="🔍 Buscar película..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          className="w-24 p-3 text-gray-900 rounded-lg focus:outline-none"
          placeholder="Año"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="w-32 p-3 text-gray-900 rounded-lg focus:outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Tipo</option>
          <option value="movie">Película</option>
          <option value="series">Serie</option>
          <option value="episode">Episodio</option>
        </select>
        <button
          className="bg-yellow-500 px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all"
          onClick={searchMovies}
        >
          Buscar
        </button>
      </div>

      {/* Contenedor de películas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
                alt={movie.Title}
                className="w-full h-72 object-cover rounded-lg"
              />
              <h3 className="mt-2 text-lg font-semibold text-center">{movie.Title}</h3>
              <p className="text-gray-400 text-center">{movie.Year}</p>
              <button className="mt-3 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 w-full">
                ⭐ Agregar a Favoritos
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-400">No se encontraron películas</p>
        )}
      </div>
    </div>
  );
}

export default App;
