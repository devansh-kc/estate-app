import { Search } from "lucide-react";
import React from "react";
import "./filter.scss";
import { TextInput, NumberInput, OptionInput } from "../Inputs/Inputs";

function Filter() {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <TextInput
          name="city"
          LabelName="Locations"
          placeholder="city location"
          LabelId="city"
        />
      </div>

      <div className="bottom">
        <OptionInput LabelName="Type" name="type" option={["Buy", "Rent"]} />

        <OptionInput
          LabelName="Property"
          name="Property"
          option={["Bunglow", "Plot", "House", "Kothi"]}
        />

        <NumberInput
          LabelName="Min Price"
          name="min price"
          placeholder="min price"
        />
        <NumberInput
          LabelName="Max Price"
          name="max price"
          placeholder="max price"
        />
        <button>
          <Search className="search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
