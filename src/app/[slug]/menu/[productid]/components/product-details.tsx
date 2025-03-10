"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";

import { formatCurrency } from "@/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  const handleIncresseQuantity = () => setQuantity((prev) => prev + 1);
  return (
    <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] px-5 flex-auto flex flex-col overflow-hidden">
      <div className="flex-auto overflow-hidden">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
        {/* PREÇO E QUANTIDADE */}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"outline"}
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant={"destructive"}
              className="h-8 w-8 rounded-xl"
              onClick={handleIncresseQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-full">
          {/* SOBRE */}
          <div className="mt-6 space-y-3 ">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          {/* INGREDIENTES */}
          <div className="mt-6 space-y-3 ">
            <div className="flex items-center gap-1.5">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold">ingredientes</h4>
            </div>
            <ul className="text-muted-fo list-disc px-5 text-sm text-muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
      <Button className="rounded-full w-full mt-6">Adicionar à Sacóla</Button>
    </div>
  );
};

export default ProductDetails;
