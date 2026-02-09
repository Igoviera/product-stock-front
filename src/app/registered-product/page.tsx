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
import { Tag, Trash } from "lucide-react";
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
      console.log("Erro ao deletar:", error);
      toast.error("");
    }
  };

  return (
    <main className="flex justify-center">
      <section className="w-7xl p-5">
        <Card className="mb-6 border-blue-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-blue-100">
            <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
              <Tag size={20} className="text-blue-600" />
              Produtos Cadastrados
            </CardTitle>
          </CardHeader>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold w-[120px]">Código</TableHead>
                <TableHead className="font-bold">Nome do Produto</TableHead>
                <TableHead className="font-bold text-right">
                  Preço de Venda
                </TableHead>
                <TableHead className="w-[80px] text-center font-bold">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id || product.code}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-slate-600">
                      {product.code}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800 uppercase text-xs tracking-wide">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {product.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <button
                          onClick={() => product.id && handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-all group"
                          title="Excluir produto"
                        >
                          <Trash
                            size={18}
                            className="text-slate-400 group-hover:text-red-500 transition-colors cursor-pointer"
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-slate-500 italic"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p>Nenhum produto encontrado no catálogo.</p>
                    </div>
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
