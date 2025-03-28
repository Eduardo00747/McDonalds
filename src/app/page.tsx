import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const restaurant = await db.restaurant.findFirst();
  if (restaurant) {
    redirect(`/${restaurant.slug}`);
  } else {
    return <h1>Nenhum restaurante encontrado</h1>;
  }
};

export default HomePage;
