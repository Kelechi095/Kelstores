"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SetQuantity from "./SetQuantity";
import Button from "../Button";
import { useCart } from "@/app/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import Reviews from "../Reviews";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

interface ProductDetailsProps {
  product: CartProductType;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  inStock: boolean;
  brand: string;
  image: string;
  quantity: number;
  price: number;
};

const isUser = false;

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { cartTotalQty, cartProducts, handleAddProductToCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState([]);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowReviews, setIsShowReviews] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    inStock: product.inStock,
    image: product.image,
    quantity: 1,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product?.id, reviews]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${product.id}`);
        setReviews(response.data);
        router.refresh();
      } catch (err) {
        console.log(err);
      }
    };

    getReviews();
  }, [product.id, router]);

  let rating = 0;

  if (reviews.length >= 1) {
    rating = Math.round(
      reviews
        .map((item: any) => item.rating)
        .reduce((item, acc) => item + acc, 0) / reviews.length
    );
  } else {
    rating = 0;
  }

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct?.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct?.quantity]);

  const handleAddReview = useCallback(
    async (pId: string) => {
      if (ratingValue === 0) return toast.error("Must include rating");

      if (!review || review.length < 1)
        return toast.error("Must include review");

      setIsLoading(true);

      try {
        await axios.post("/api/reviews", {
          productId: pId,
          review,
          rating: ratingValue,
        });
        setReview("");
        setRatingValue(0);
        toast.success("Review submitted");
        router.push("/");
        setIsLoading(false);
      } catch (err) {
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    },
    [ratingValue, review, router]
  );

  const HorizontalLine = () => {
    return <hr className="w-[100%] my-2" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="py-2 justify-self-start">
        <div className="h-full max-h-[400px] min-h-[300px]">
          <Image
            src={product?.image}
            alt={product?.name}
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-full h-full"
          />
        </div>

        <h2 className="mt-3 text-slate-500 font-semibold">Product Rating</h2>

        <div className="w-full mt-1">
          <Rating value={rating} readOnly className="text-3xl" />

          <HorizontalLine />
          {isShowReviews ? (
            <>
              <h2 className="mt-3 text-slate-500 font-semibold">
                Product Reviews
              </h2>
              <Reviews reviews={reviews} />
              <button className="text-sm text-slate-600 underline" onClick={() => setIsShowReviews(false)}>Hide reviews</button>
            </>
          ) : (
            <>
              <button className="text-sm text-slate-600 underline" onClick={() => setIsShowReviews(true)}>
                Show Reviews
              </button>
            </>
          )}
          <HorizontalLine />
        </div>
      </div>

      <div className="flex flex-col mt-16 gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product?.name}</h2>
        <HorizontalLine />
        <div className="text-justify">{product?.description}</div>
        <HorizontalLine />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product?.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product?.brand}
        </div>
        <div className={product?.inStock ? "text-teal-400" : "text-rose-400"}>
          {product?.inStock ? "In stock" : "Out of stock"}
        </div>
        <HorizontalLine />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />

              <span>Product Added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <HorizontalLine />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
      <div>
        <textarea
          onChange={(e: any) => setReview(e.target.value)}
          className="border border-slate-400 w-full max-h-[150px] min-h-[150px] p-2 mt-4"
        />
        <div className="max-w-[140px] mt-2">
          <h2 className="mt-3 text-slate-500 font-semibold">Leave a rating</h2>

          <Rating
            className="text-2xl"
            value={ratingValue}
            onChange={(event, newValue: any) => {
              setRatingValue(newValue);
            }}
          />
          <Button
            label={isLoading ? "Submitting" : "Submit Review"}
            outline
            small
            onClick={() => handleAddReview(product.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
