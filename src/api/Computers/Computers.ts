import { ProductsSchema } from "./type";

export async function computersGet() {
  const response = await fetch("/products");
  const data = await response.json();
  return ProductsSchema.parse(data);
}
