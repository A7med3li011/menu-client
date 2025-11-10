import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, imageBase } from "../services/apis";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/final logo-03.png";

function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { data: productData, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const product = productData?.data;
  const subCategoryId = product?.subCategory?._id || product?.subCategory;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-12 h-12 animate-spin text-popular" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-red-500 text-xl">Error loading product details</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary p-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            onClick={() =>
              navigate(subCategoryId ? `/subcategory/${subCategoryId}/products` : "/")
            }
            className="flex items-center gap-2 text-popular hover:text-popular/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img src={logo} alt="Logo" className="h-16 md:h-20 object-contain" />
          </motion.div>

          <div className="w-32"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-secondary rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 lg:h-full overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={`${imageBase}${product.image}`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent lg:bg-gradient-to-r"></div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              >
                {product.title}
              </motion.h1>

              {product.price && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-6"
                >
                  {product.priceAfterDiscount ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-popular text-5xl font-bold">
                        ${product.priceAfterDiscount}
                      </span>
                      <span className="text-gray-500 text-3xl line-through">
                        ${product.price}
                      </span>
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        SALE
                      </span>
                    </div>
                  ) : (
                    <span className="text-popular text-5xl font-bold">
                      ${product.price}
                    </span>
                  )}
                </motion.div>
              )}

              {product.description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Ingredients
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                        className="bg-white px-4 py-2 rounded-full text-gray-700 text-sm border border-gray-300"
                      >
                        {typeof ingredient === "string"
                          ? ingredient
                          : ingredient.title || ingredient.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {product.extras && product.extras.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Available Extras
                  </h2>
                  <div className="space-y-2">
                    {product.extras.map((extra, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.75 + index * 0.05 }}
                        className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-300"
                      >
                        <span className="text-gray-800 font-medium">
                          {extra.name}
                        </span>
                        <span className="text-popular font-bold">
                          +${extra.price}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {product.category && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="border-t border-gray-300 pt-6 mt-6"
                >
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-800">Category:</span>{" "}
                      {typeof product.category === "string"
                        ? product.category
                        : product.category.title}
                    </div>
                    {product.subCategory && (
                      <>
                        <span>•</span>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Subcategory:
                          </span>{" "}
                          {typeof product.subCategory === "string"
                            ? product.subCategory
                            : product.subCategory.title}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
