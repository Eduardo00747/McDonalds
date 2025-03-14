import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: { slug: string; productid: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productid } = params; // ✅ Correção aqui!

  const product = await db.product.findUnique({
    where: { id: productid },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  // ⚠️ Erro de Lógica: Condição invertida!
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </>
  );
};

export default ProductPage;
