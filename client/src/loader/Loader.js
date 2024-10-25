import axios from "axios";
import { defer } from "react-router-dom";

export async function singlePageLoader({ _, params }) {
  const response = await axios.get(
    `http://localhost:8000/api/posts/${params.id}`
  );
  return response.data;
}

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const response = await axios.get(`http://localhost:8000/api/posts?${query}`);
  // console.log(response);
  return defer({
    postResponse: response,
  });
};
