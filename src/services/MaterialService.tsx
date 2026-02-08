import { Material } from "@/types/material";
import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:8080/api/v1"
})


export class MaterialService{

    getAll(){
        return api.get<Material[]>("/materials");
    }

    create(product: Material){
        api.post("/materials", product)
    }

    delete(productId: number){
        api.delete(`/materials/${productId}`)
    }

}