import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item já está no carrinho!");
    } else {
      if (data.stock < 1) {
        toast.error("Estoque do produto limitado!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item adicionado ao carrinho com sucesso!");
      }
    }
  };

  return (
    <>
      <div className="relative cursor-pointer bg-white rounded-lg  transition-shadow duration-300 overflow-hidden">
        <div className="aspect-w-1 aspect-h-1">
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <img
              src={`${data.images && data.images[0]?.url}`}
              alt={data.name}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </Link>
        </div>
        <div className="p-4">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">{data.shop.name}</h5>
          </Link>
          <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
            <h4 className="mt-2 text-lg font-semibold text-gray-800 line-clamp-2 hover:text-gray-600 transition-colors duration-200">
              {data.name}
            </h4>
            <div className="mt-2">
              <Ratings rating={data?.ratings} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline">
                <h5 className="text-xl font-bold text-gray-900">
                  {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} Mt
                </h5>
                {data.originalPrice && data.originalPrice !== data.discountPrice && (
                  <h4 className="ml-2 text-sm  line-through text-red-500">
                    {data.originalPrice} Mt
                  </h4>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {data?.sold_out} vendidos
              </span>
            </div>
          </Link>
        </div>
        <div className="absolute top-2 right-2 flex flex-col space-y-2 bg-white rounded-lg p-2">
          {click ? (
            <AiFillHeart
              size={24}
              className="text-red-500 hover:text-red-600 transition-colors duration-200"
              onClick={() => removeFromWishlistHandler(data)}
              title="Remover da lista de desejos"
            />
          ) : (
            <AiOutlineHeart
              size={24}
              className="text-black hover:text-red-500 transition-colors duration-200"
              onClick={() => addToWishlistHandler(data)}
              title="Adicionar à lista de desejos"
            />
          )}
          {/* <AiOutlineEye
            size={24}
            className="text-black hover:text-blue-500 transition-colors duration-200"
            onClick={() => setOpen(!open)}
            title="Visualização rápida"
          /> */}
          <AiOutlineShoppingCart
            size={24}
            className="text-black hover:text-green-500 transition-colors duration-200"
            onClick={() => addToCartHandler(data._id)}
            title="Adicionar ao carrinho"
          />
        </div>
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;
