import { CompositionsProduct } from "@/types/products";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export class CompositionProductService {
  create(composition: CompositionsProduct) {
    api.post("/compositions", composition);
  }
}
