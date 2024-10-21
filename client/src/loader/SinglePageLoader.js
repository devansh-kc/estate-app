import axios from "axios";

export async function singlePageLoader({ req, params }) {
    console.log(params)
  const response = await axios.get(
    `http://localhost:8000/api/posts/${params.id}`,
    
  );
  return response.data
}
