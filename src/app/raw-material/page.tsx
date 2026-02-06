"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const RawMaterial = () => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: 0,
  });

  const handleCreateRawMaterial = () => {};

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
              onClick={handleCreateRawMaterial}
              className="bg-blue-700 cursor-pointer mt-3"
            >
              Cadastrar
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default RawMaterial;
