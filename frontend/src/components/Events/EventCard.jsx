import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("O item já está no carrinho!");
    } else {
      if (data.stock < 1) {
        toast.error("Estoque do produto esgotado!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item adicionado ao carrinho com sucesso!");
      }
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-lg  ${active ? "mb-0" : "mb-12"
        } lg:flex p-4 transition-transform hover:scale-105`}
    >
      {/* Imagem do Produto */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
      <Link to={`/product/${data._id}?isEvent=true`}>
        <img
          src={`${data.images[0]?.url}`}
          alt={`Imagem do produto ${data.name}`}
          className="w-full h-auto max-h-[300px] object-contain rounded-md"
        />
        </Link>
      </div>

      {/* Detalhes do Produto */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center mt-4 lg:mt-0 lg:pl-6">
        <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{data.description}</p>

        <div className="flex items-center justify-between mt-4">
          {/* Preços */}
          <div className="flex items-center">
            <h5 className="text-lg font-medium text-red-500 line-through mr-2">
              {data.originalPrice} MT
            </h5>
            <h5 className="text-xl font-bold text-green-600">
              {data.discountPrice} MT
            </h5>
          </div>
          {/* Quantidade Vendida */}

        </div>

        {/* Contagem Regressiva */}
        <CountDown data={data} />
        <br />
        <span className="text-sm text-gray-500">
          {data.sold_out} vendidos
        </span>
        {/* Botões */}
        <div className="flex items-center mt-4">
          {/* <Link to={`/product/${data._id}?isEvent=true`}>
            <button
              className="bg-[#131921] text-white py-2 px-4 rounded-md hover:bg-[#131921ce] transition-all"
              aria-label="Ver detalhes do produto"
            >
              Detalhes
            </button>
          </Link> */}
          <button
            className="bg-[#131921] text-white py-2 px-4 rounded-md hover:bg-[#131921ce] transition-all"
            onClick={() => addToCartHandler(data)}
            aria-label="Adicionar ao carrinho"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
