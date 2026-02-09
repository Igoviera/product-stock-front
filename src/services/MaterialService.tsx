import { Material } from "@/types/material";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export class MaterialService {
  getAll() {
    return api.get<Material[]>("/materials");
  }

  async create(product: Material) {
    try {
      await api.post("/materials", product);
      
    } catch (error: any) {
      const messages = error.response?.data?.errors;
      const errorMessage = messages ? messages.join(", ") : "Erro desconhecido";
      throw new Error(errorMessage);
    }
  }

  delete(productId: number) {
    api.delete(`/materials/${productId}`);
  }
}
