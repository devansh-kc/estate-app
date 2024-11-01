import { Search } from "lucide-react";
import React from "react";
import "./filter.scss";
import { TextInput, NumberInput, OptionInput } from "../Inputs/Inputs";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [Query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 100000,
    property: searchParams.get("property") || "",
  });

  function handleChange(e) {
    setQuery({
      ...Query,
      [e.target.name]: e.target.value,
    });
  }
  function handleFilter() {
    setSearchParams(Query);
  }
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <TextInput
          name="city"
          LabelName="Locations"
          placeholder="city location"
          OnChange={handleChange}
        />
      </div>

      <div className="bottom">
        <OptionInput
          LabelName="type"
          name="type"
          option={["buy", "rent"]}
          OnChange={handleChange}
        />

        <OptionInput
          LabelName="property"
          name="property"
          option={["condo", "flat", "land", "banglow"]}
          OnChange={handleChange}
        />

        <NumberInput
          LabelName="Min Price"
          name="min price"
          placeholder="min price"
          OnChange={handleChange}
        />
        <NumberInput
          LabelName="Max Price"
          name="max price"
          placeholder="max price"
          OnChange={handleChange}
        />
        <button onClick={handleFilter}>
          <Search className="search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
