import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductsBySubCategory,
  getSubCategory,
  imageBase,
} from "../services/apis";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/final logo-03.png";

function Products() {
  const navigate = useNavigate();
  const { subCategoryId } = useParams();

  const { data: subCategory } = useQuery({
    queryKey: ["subcategory", subCategoryId],
    queryFn: () => getSubCategory(subCategoryId),
  });

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", subCategoryId],
    queryFn: () => getProductsBySubCategory(subCategoryId),
  });

  const products = productsData?.data || [];
  const categoryId =
    subCategory?.data?.category?._id || subCategory?.data?.category;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-12 h-12 animate-spin text-popular" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-red-500 text-xl">Error loading products</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary p-3 sm:p-4 md:p-6 rounded-lg"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate(categoryId ? `/category/${categoryId}/subcategories` : "/")}
            className="flex items-center gap-1 sm:gap-2 text-popular hover:text-popular/80 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Subcategories</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 lg:h-20 object-contain"
            />
          </motion.div>

          <div className="w-16 sm:w-24 md:w-32"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center"
        >
          {subCategory?.data?.title || "Products"}
        </motion.h1>
        {subCategory?.data?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base"
          >
            {subCategory.data.description}
          </motion.p>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {products?.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-200"
            >
              <motion.div
                className="relative h-40 sm:h-44 md:h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`${imageBase}${product.image}`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </motion.div>

              <div className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {product.title}
                </h2>
                {product.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.price && (
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-popular text-xl sm:text-2xl font-bold">
                          {product.priceAfterDiscount} LE
                        </span>
                        <span className="text-gray-500 text-base sm:text-lg line-through">
                          {product.price} LE
                        </span>
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      </>
                    ) : (
                      <span className="text-popular text-xl sm:text-2xl font-bold">
                        {product.price} LE
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {products?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-600 text-xl mt-20"
          >
            No products available in this subcategory
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Products;
