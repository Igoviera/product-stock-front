export interface Product {
  id?: number;
  code: string;
  name: string;
  price: number;
}

export interface Suggestion {
  productName: string[];
  producaoTotal: number;
  valorTotal: number;
}

export interface CompositionsProduct {
  id?: number;
  codeProduct: string;
  codeMaterial: string;
  necessaryQuantity: number;
}