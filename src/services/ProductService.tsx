import { Product } from "@/types/products";
import axios from "axios";


export const api = axios.create({
    baseURL:"http://localhost:8080/api/v1"
})


export class ProductService{

    getAll(){
        return api.get<Product[]>("/products");
    }

    create(product: Product){
        return api.post("/products", product)
    }

    delete(productId: number){
       return api.delete(`/products/${productId}`)
    }

    suggestProduction(){
        return api.get('/products/suggest')
    }
}