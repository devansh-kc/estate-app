import React from "react";
import { useParams } from "react-router-dom";
import { singlePostData } from "../../../data/dummydata";
import "./singlePage.scss";

function SinglePage() {
  const { id } = useParams();
  const numberId = Number(id);
  console.log(singlePostData);
  // const filteredData = singlePostData.filter((item) => item.id === numberId);

  return (
    <div className="singlePageContainer">
      <div className="details"></div>
      <div className="features">
        <div className="General"></div>
      </div>
    </div>
  );
}

export default SinglePage;
