import { Product } from "@/types/products";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export class ProductService {
  getAll() {
    return api.get<Product[]>("/products");
  }

  async create(product: Product) {
    try {
      return await api.post("/products", product);
    } catch (error: any) {
      const messages = error.response?.data?.errors;
      const errorMessage = messages ? messages.join(", ") : "Erro desconhecido";

      throw new Error(errorMessage);
    }
  }

  delete(productId: number) {
    return api.delete(`/products/${productId}`);
  }

  suggestProduction() {
    return api.get("/products/suggest");
  }
}
