import React, { useState } from "react";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  NumberInput,
  OptionInput,
  TextInput,
} from "../../components/Inputs/Inputs";

function NewPostPage() {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [value, setValue] = useState();
  async function handleSubmit() {}

  function Input({ title, type, htmlFor }) {
    return (
      <div className="item">
        <label htmlFor={htmlFor}>{title}</label>
        <input id={htmlFor} name={htmlFor} type={type} />
      </div>
    );
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <TextInput LabelName="Title" name="title" />
            <TextInput LabelName="Price" name="price" />
            <TextInput LabelName="Address" name="address" />

            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <TextInput LabelName="City" name="city" />
            <NumberInput LabelName="Bedroom Number" name="bedroom" min={1} />
            <NumberInput LabelName="Bathroom Number" name="bathroom" min={1} />
            <TextInput LabelName="Latitude" name="latitude" />
            <TextInput LabelName="Longitude" name="longitude" />
            <OptionInput
              LabelName="Type"
              name="type"
              option={["Buy", "Rent"]}
            />

            <OptionInput LabelName="Type" name="property" option={[]} />
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
