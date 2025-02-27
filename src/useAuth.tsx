import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";

const API_URL = "https://fakestoreapi.com/auth/login";

interface LoginResponse {
  token: string;
}

export const useAuth = () => {
  const { dispatch } = useGlobalContext();

  
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
      const response = await axios.post<LoginResponse>(API_URL, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch({ type: "LOGIN", payload: { token: data.token } });
    },
    onError: () => {
      alert("Invalid credentials. Please try again.");
    },
  });

  
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout,
  };
};
