import React, { Suspense } from "react";
import "./listpage.scss";
import { listData } from "../../../data/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
import Map from "../../components/Map/Map.jsx";
import { useLoaderData, Await } from "react-router-dom";
function ListPage() {
  const data = useLoaderData();
  console.log(data.postResponse.data.posts);
  return (
    <div className="listPage">
      <div className="list">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse.data.posts}
              errorElement={<p>Error loading posts</p>}
            >
              {
                (posts) =>
                  posts.map((item) => {
                    return <Card key={item.id} item={item} />;
                  })

              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="map">
        <Map items={data.postResponse.data.posts} />
      </div>
    </div>
  );
}

export default ListPage;
