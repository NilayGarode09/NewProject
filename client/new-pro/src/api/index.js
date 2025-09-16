import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:8080" });

// Add Authorization header automatically
API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile?.token) {
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
});

export const getPostData = () => API.get("/posts");
export const createPost = (newPost)=>API.post("/form",newPost)
export const editPost = (id, editPost) => API.patch(`/form/${id}`, editPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id)=>API.patch(`/posts/${id}/likeCount`)

export const signin =(formData) =>API.post("/user/signin",formData);
export const signup =(formData) =>API.post("/user/signup",formData);