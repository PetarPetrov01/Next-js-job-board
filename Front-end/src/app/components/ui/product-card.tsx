'use client'

import Image from "next/image";
import { Product } from "../../../types/Product";
import { useRouter } from "next/navigation";

export default function ProductCard({ prod }: { prod: Product }) {

const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${prod.id}`)}
      key={prod.id}
      className="flex flex-col sm:w-[49%] md:w-[32%] lg:w-[23.5%] justify-start gap-2 mt-8 p-3 rounded-lg  bg-[#d1e8e2d2] shadow-s cursor-pointer hover:bg-new-mint duration-100"
    >
      <div className="flex w-full justify-center items-center overflow-hidden self-center">
        <Image src={prod.images[0]} alt={prod.name} width={100}  height={100} className="w-[90%]"/>
      </div>
      <div>
        <h2 className="text-2xl text-new-gray">{prod.name}</h2>
        <h2 className="text-2xl text-new-gray">${prod.price}</h2>
      </div>
      <p className="text-new-gray">In stock: {prod.stock} </p>
    </div>
  );
}