import axios from "axios";
import { defer } from "react-router-dom";
import { apiRequest } from "../apiRequest/apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/posts/${params.id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
 
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const response = await axios.get(`http://localhost:8000/api/posts?${query}`, {
    withCredentials: true,
  });
  return defer({
    postResponse: response.data.posts,
  });
};

export const profilePageLoader = async () => {
  const PostPromise = await apiRequest(`user/profilePosts`);
  const ChatPromise = await apiRequest("chats/");

  return defer({
    postResponse: PostPromise.data,
    chatPromise: ChatPromise.data,
  });
};
