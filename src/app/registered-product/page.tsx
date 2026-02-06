"use client";

import { Product } from "@/types/products";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { ProductService } from "@/services/ProductService";
import { toast } from "sonner";

const productService = new ProductService();

const RegisteredProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    productService
      .getAll()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    try {
      await productService.delete(productId);
      setProducts(products.filter((p) => p.id !== productId));

      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);

      toast.error("Deu erro");
    }
  };

  return (
    <main className="flex justify-center">
      <section className="w-7xl p-5">
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Produtos Cadastrados
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Códico</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id || product.code}>
                    <TableCell className="font-medium">
                      {product.code}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      R${product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      <Trash
                        color="red"
                        size={18}
                        onClick={() => product.id && handleDelete(product.id)}
                        className="cursor-pointer"
                      ></Trash>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </section>
    </main>
  );
};

export default RegisteredProduct;
