import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
  slug: string;
}

const products = ({ products, slug }: ProductsProps) => {
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}`}
          className="flex items-center justify-between gap-10 border-b py-5"
        >
          {/* DIREITA */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className=" line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          {/* ESQUERDA */}
          <div className="relative min-h-[80px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default products;
