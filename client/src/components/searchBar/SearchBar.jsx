import React, { useState } from "react";
import { Search } from "lucide-react";
import "./searchbar.scss";
function SearchBar() {
  const [Query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const types = ["Buy", "Rent"];
  function switchOption(option) {
    setQuery((prevOption) => ({ ...prevOption, type: option }));
  }
  return (
    <div className="searchBar">
      <div className="buttons">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchOption(type)}
            className={Query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form action="">
        <input type="text" placeholder="City Location" name="location" />
        <input
          type="number"
          placeholder="min price"
          min={0}
          max={10000000}
          name="min price"
        />
        <input
          type="number"
          placeholder="max price"
          min={0}
          max={10000000}
          name="max price"
        />
        <button>
          <Search className="searchIcon"/>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
