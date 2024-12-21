import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  const toggleCategories = () => {
    setShowMobileCategories((prev) => !prev);
  };

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        {/* Botão para alternar categorias em telas pequenas */}
        <div className="block lg:hidden mb-4">
          <button
            onClick={toggleCategories}
            className="w-full bg-[#cf9b56] text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-[#febd69] transition"
          >
            {showMobileCategories ? "Fechar Categorias" : "Ver Categorias"}
          </button>
        </div>

        {/* Grade de categorias */}
        <div
          className={`${
            showMobileCategories || window.innerWidth >= 1024
              ? "grid"
              : "hidden"
          } grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]`}
        >
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] font-semibold text-gray-700`}>
                    {i.title}
                  </h5>
                  <img
                    src={i.image_Url}
                    className="w-[100px] object-cover rounded-md"
                    alt={i.title}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
