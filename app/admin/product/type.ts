export interface ProductFormValues {
  title: string;
  description: string;
  range: string;
  price: string;
  category: string;
  manufacturer?: string;
  unit: string;
  cgst: string;
  sgst: string;
  igst: string;
}

export interface ICategory {
  id: string;
  category: string;
  parentCategory: string;
}
