import React from "react";
import "./listpage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
import Map from "../../components/Map/Map.jsx";
import { Suspense } from "react";


import { useLoaderData, Await } from "react-router-dom";
function ListPage() {
  const {postResponse} = useLoaderData();
  // const posts=  postResponse.data.posts
  return (
    <div className="listPage">
      <div className="list">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={postResponse}
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
        <Map items={postResponse} />
      </div>
    </div>
  );
}

export default ListPage;
