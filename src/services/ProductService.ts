import { Product, Suggestion } from "@/types/products";
import { api } from "./api";

export class ProductService {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
  }

  async create(product: Product): Promise<Product> {
    const response = await api.post<Product>("/products", product);
    return response.data;
  }

  async delete(productId: number): Promise<void> {
    await api.delete(`/products/${productId}`);
  }

  async suggestProduction(): Promise<Suggestion> {
    const response = await api.get("/products/suggest");
    return response.data;
  }
}
