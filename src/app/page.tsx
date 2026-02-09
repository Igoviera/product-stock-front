"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductService } from "@/services/ProductService";
import { CompositionsProduct, Product, Suggestion } from "@/types/products";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CompositionProductService } from "@/services/CompositionService";

const productService = new ProductService();
const compositionService = new CompositionProductService();

const Home = () => {
  const [suggestedProduct, setsuggestedProduct] = useState<Suggestion | null>(
    null,
  );
  const [formData, setFormData] = useState<Product>({
    code: "",
    name: "",
    price: 0,
  });

  const [compositionsProduct, setCompositionsProduct] =
    useState<CompositionsProduct>({
      codeProduct: "",
      codeMaterial: "",
      necessaryQuantity: 0,
    });

  const fetchSuggestProduction = () => {
    productService
      .suggestProduction()
      .then((response) => setsuggestedProduct(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchSuggestProduction();
  }, []);

  const handleCreateProduct = async () => {
    try {
      await productService.create(formData);
      setFormData({ code: "", name: "", price: 0 });
      toast.success("Produto cadastrado!", {
        description: `O produto ${formData.name} foi salvo.`,
      });
    } catch (error) {
      const mensagemFinal = error.message || "Erro inesperado";
      toast.error(mensagemFinal);
    }
  };

  const handleCreateCompositionProduct = async () => {
    try {
      await compositionService.create(compositionsProduct);
      setCompositionsProduct({
        codeProduct: "",
        codeMaterial: "",
        necessaryQuantity: 0,
      });
      toast.success("Composição do Produto cadastrada!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <main className="flex justify-center">
      <section className="w-7xl p-5">
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              Cadastrar Produto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>Código:</p>
                <Input
                  placeholder="Ex: PROD-100"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
              </div>
              <div>
                <p>Valor:</p>
                <Input
                  placeholder="Valor do produto"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <p>Nome:</p>
              <Input
                placeholder="Nome do produto"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <Button
              onClick={handleCreateProduct}
              className="bg-blue-700 cursor-pointer mt-3"
            >
              Cadastrar
            </Button>
          </CardContent>
        </Card>
        <Card className="mb-6 border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800">
              Vincular Matéria-Prima
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Código do Produto:</p>
                <Input
                  placeholder="Ex: PROD-100"
                  value={compositionsProduct.codeProduct}
                  onChange={(e) =>
                    setCompositionsProduct({
                      ...compositionsProduct,
                      codeProduct: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Código do Material:</p>
                <Input
                  placeholder="Ex: MAT-001"
                  value={compositionsProduct.codeMaterial}
                  onChange={(e) =>
                    setCompositionsProduct({
                      ...compositionsProduct,
                      codeMaterial: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">
                  Quantidade Necessária:
                </p>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={compositionsProduct.necessaryQuantity}
                  onChange={(e) =>
                    setCompositionsProduct({
                      ...compositionsProduct,
                      necessaryQuantity: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleCreateCompositionProduct}
              className="bg-emerald-700 hover:bg-emerald-800 cursor-pointer mt-4"
            >
              Adicionar à Composição
            </Button>
          </CardContent>
        </Card>
        {suggestedProduct && (
          <Card className="mb-6 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                Sugestão de Produção
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Trocamos flex por grid: 1 coluna no mobile, 3 colunas no desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div>
                  <p className="text-xs uppercase text-slate-500 font-bold">
                    Produto
                  </p>
                  <p className="text-lg leading-tight">
                    {suggestedProduct.productName.join(", ")}
                  </p>
                </div>

                {/* Alinhamento centralizado apenas no desktop via md:text-center */}
                <div className="md:text-center">
                  <p className="text-xs uppercase text-slate-500 font-bold">
                    Quantidade
                  </p>
                  <p className="text-lg font-semibold">
                    {suggestedProduct.producaoTotal} un.
                  </p>
                </div>

                {/* Alinhamento à direita apenas no desktop via md:text-right */}
                <div className="md:text-right">
                  <p className="text-xs uppercase text-slate-500 font-bold">
                    Valor Total
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {suggestedProduct.valorTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
};

export default Home;
