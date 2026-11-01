import { useState } from "react";

const notesname = [
  "name of notes"
];

export const Search = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = query.trim().toLowerCase();
    setResults(
      search ? notesname.filter((notesname) => notesname.toLowerCase().includes(search)) : []
    );
  };
return (
    <div id="search-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />

      </form>
      <div id="results">
        {results.length > 0 ? (
          results.map((result, index) => (
        <p className="result-item" key={index}>
          {result}
          </p>
        ))
        ):(
        <p>No results found</p>
        )}

      </div>
    </div>
  )
}
