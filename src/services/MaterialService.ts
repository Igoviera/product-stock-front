import { Material } from "@/types/material";
import {api} from "./api";


export class MaterialService {

  async getAll(): Promise<Material[]> {
   const response = await api.get<Material[]>("/materials");
   return response.data;
  }

  async create(product: Material): Promise<Material> {
   const response = await api.post<Material>("/materials", product);
   return response.data;
  }

  async delete(productId: number): Promise<void> {
    await api.delete(`/materials/${productId}`);
  }
}
