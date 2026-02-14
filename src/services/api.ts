import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const messages = error.response?.data?.errors;
        const errorMessage = messages ? messages.join(", ") : "Erro desconhecido";
        return Promise.reject(new Error(errorMessage));
    }
)