"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();
  const handlerBackClick = () => router.back();
  return (
    <div className="relative w-full min-h-[300px]">
      <Button
        variant={"secondary"}
        size="icon"
        className="absolute top-4 left-4 rounded-full z-50"
        onClick={handlerBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />

      <Button
        variant={"secondary"}
        size="icon"
        className="absolute top-4 right-4 rounded-full z-50"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
