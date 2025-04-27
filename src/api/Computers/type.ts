import { z } from "zod";

const ComputersSchema = z.object({
  id: z.number(),
  img: z.string(),
  title: z.string(),
  price: z.number().positive(),
  descr: z.string(),
  discount: z.number().min(0).max(100).optional(),
  rate: z.number().min(0).max(5),
});

export const ConnectionSchema = z.object({
  title: z.string(),
  computers: z.array(ComputersSchema),
});

export const ProductsSchema = z.array(ConnectionSchema);

export type Computers = z.infer<typeof ComputersSchema>;
export type Products = z.infer<typeof ProductsSchema>;
