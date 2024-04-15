import axios from 'axios';
import { Post } from '../models/Post';
const baseurl = "https://jsonplaceholder.typicode.com";

const fetchAllPost =  async () => {
  try {
  const {data} = await axios.get<Post>(`${baseurl}/posts`);
  return data;
  } catch(e) {
    console.log(e);
  }
};

const fetchPostById =  async (id:string) => {
  try {
  const {data} = await axios.get<Post>(`${baseurl}/posts/${id}`);
  return data;
  } catch(e) {
    console.log(e);
  }
};

export {fetchAllPost,fetchPostById}