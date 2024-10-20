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
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    const formData = new FormData(e.target);
    e.preventDefault();

    const inputs = Object.fromEntries(formData);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/posts/",
        {
          postData: {
            title: inputs.title,
            price: parseInt(inputs.price),
            address: inputs.address,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            type: inputs.type,
            property: inputs.property,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            img: images,
            PostDetails: {
              desc: value,
              utilities: inputs.utilities,
              pet: inputs.pet,
              income: inputs.income,
              size: parseInt(inputs.size),
              school: parseInt(inputs.school),
              bus: parseInt(inputs.bus),
              restaurant: parseInt(inputs.restaurant),
            },
          },
        },
        {
          withCredentials: true,
        }
      );
      if (result.data.success) {
        setError("");
        navigate("/" + result.data.id);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  // function Input({ name, LabelName }) {
  //   return (
  //     <div className="item">
  //       <label htmlFor={name}>{LabelName}</label>
  //       <input id={name} name={name} type={name} />
  //     </div>
  //   );
  // }

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
              <textarea
                rows={5}
                cols={5}
                name="desc"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* <ReactQuill theme="snow" onChange={setValue} value={value} /> */}
            </div>
            <TextInput LabelName="City" name="city" />
            <NumberInput LabelName="Bedroom Number" name="bedroom" min={1} />
            <NumberInput LabelName="Bathroom Number" name="bathroom" min={1} />
            <TextInput LabelName="Latitude" name="latitude" />
            <TextInput LabelName="Longitude" name="longitude" />
            <OptionInput
              LabelName="Type"
              name="type"
              option={["buy", "rent"]}
            />

            <OptionInput
              LabelName="Property"
              name="property"
              option={["condo", "flat", "land", "banglow"]}
            />
            <OptionInput
              LabelName="Utilities Policy"
              name="utilities"
              option={[
                "Owner is responsible",
                "Tenant is responsible",
                "Shared",
              ]}
            />
            <OptionInput
              LabelName="Pet Policy"
              name="pet"
              option={["Allowed", "Not Allowed"]}
            />
            <TextInput name="income" LabelName="Income" />
            <NumberInput name="size" LabelName="Total Size (sqft)" min={0} />
            <NumberInput name="school" min={0} LabelName="School" />
            <NumberInput name="bus" min={0} LabelName="Bus" />
            <NumberInput LabelName="Restaurant" name="restaurant" min={0} />

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
            cloudName: "dcjh2tkr8",
            uploadPreset: "realEstate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
