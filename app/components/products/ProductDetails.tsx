"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import SetQuantity from "./SetQuantity";
import Button from "../Button";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    image: product.image,
    quantity: 1,
    price: product.price,
  });

  const productRating =
    product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
    product.reviews.length;

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct.quantity]);

  const HorizontalLine = () => {
    return <hr className="w-[30%] my-2" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="h-full max-h-[500px] min-h-[300px]">
      <Image
        src={product.image}
        alt={product.name}
        width={0}
        height={0}
        sizes="100vw"
        className="object-contain w-full h-full"
      />
      </div>

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>
            {product.reviews.length}{" "}
            {product.reviews.length !== 1 ? "reviews" : "review"}
          </div>
        </div>
        <HorizontalLine />
        <div className="text-justify">{product.description}</div>
        <HorizontalLine />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <HorizontalLine />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <HorizontalLine />
        <div className="max-w-[300px]">
          <Button label="Add To Cart" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
