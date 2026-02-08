"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MaterialService } from "@/services/MaterialService";
import { Material } from "@/types/material";
import { Badge, Package2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const materialService = new MaterialService();

const RawMaterial = () => {
  const [materialList, setMaterialList] = useState<Material[]>([]);
  const [material, setMaterial] = useState<Material>({
    code: "",
    name: "",
    stockQuantity: 0,
  });

  const fetMaterials = () => {
    materialService
      .getAll()
      .then((response) => setMaterialList(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = (materialId: number) => {};

  useEffect(() => {
    fetMaterials();
  }, []);

  const handleCreateRawMaterial = async () => {
    try {
      await materialService.create(material);
      setMaterial({ code: "", name: "", stockQuantity: 0 });
      toast.success("Materia Prima cadastrada!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <main className="flex justify-center">
      <section className="w-7xl p-5">
        <Card className="mb-6 border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-800">
              Cadastrar Materia Prima
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>Código:</p>
                <Input
                  placeholder="Ex: MAT-001"
                  value={material.code}
                  onChange={(e) =>
                    setMaterial({ ...material, code: e.target.value })
                  }
                />
              </div>
              <div>
                <p>Name:</p>
                <Input
                  placeholder="Madeira"
                  value={material.name}
                  onChange={(e) =>
                    setMaterial({ ...material, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <p>Quantidade:</p>
              <Input
                value={material.stockQuantity}
                onChange={(e) =>
                  setMaterial({
                    ...material,
                    stockQuantity: Number(e.target.value),
                  })
                }
              />
            </div>

            <Button
              onClick={handleCreateRawMaterial}
              className="bg-emerald-700 hover:bg-emerald-800 cursor-pointer mt-4"
            >
              Cadastrar
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6 border-blue-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-blue-100">
            <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
              <Package2 size={20} className="text-blue-600" />
              Matérias Primas Cadastradas
            </CardTitle>
          </CardHeader>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold">Código</TableHead>
                <TableHead className="font-bold">Nome</TableHead>
                <TableHead className="font-bold text-center">Estoque</TableHead>
                <TableHead className="w-[80px] text-center font-bold">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialList.length > 0 ? (
                materialList.map((material) => (
                  <TableRow
                    key={material.id || material.code}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-slate-600">
                      {material.code}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800">
                      {material.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {material.stockQuantity} un
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <div className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                        <Trash
                          size={18}
                          onClick={() =>
                            material.id && handleDelete(material.id)
                          }
                          className="cursor-pointer text-slate-400 group-hover:text-red-500"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-slate-500 italic"
                  >
                    Nenhuma matéria prima encontrada.
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

export default RawMaterial;
