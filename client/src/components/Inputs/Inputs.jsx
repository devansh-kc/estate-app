import "./inputs.scss";

function TextInput({
  type = "text",
  placeholder = "",
  name = "",
  LabelName,
  OnChange = {},
}) {
  return (
    <div className="item">
      <label htmlFor={name}>{LabelName}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={OnChange}
      />
    </div>
  );
}

function OptionInput({ LabelName, name, option = [], OnChange = {} }) {
  return (
    <div className="item">
      <label htmlFor={name}>{LabelName}</label>
      <select name={name} id={name} defaultChecked="false" onChange={OnChange}>
        <option value="">select an Option</option>
        {option.map((optionName, idx) => {
          return (
            <option key={idx} value={optionName}>
              {optionName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function NumberInput({
  LabelName,
  name,
  placeholder,
  min = 0,
  max = 10000000,
  OnChange = {},
}) {
  return (
    <div className="item">
      <label htmlFor={name}>{LabelName}</label>
      <input
        onChange={OnChange}
        type="number"
        placeholder={placeholder}
        min={min}
        max={max}
        name={name}
      />
    </div>
  );
}

export { TextInput, NumberInput, OptionInput };
