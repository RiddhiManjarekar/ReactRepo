import axios from "axios";

const API_URL = "https://fakestoreapi.com/auth/login";


export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data; 
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
