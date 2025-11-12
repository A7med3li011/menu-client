import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSubCategoriesByCategory,
  getCategory,
  imageBase,
} from "../services/apis";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/final logo-03.png";

function SubCategories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
  });

  const {
    data: subCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubCategoriesByCategory(categoryId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <Loader2 className="w-12 h-12 animate-spin text-popular" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-red-500 text-xl">Error loading subcategories</div>
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
      className="min-h-screen bg-primary p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-popular hover:text-popular/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Categories
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
              className="h-16 md:h-20 object-contain"
            />
          </motion.div>

          <div className="w-32"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white  text-center mb-5"
        >
          {category?.data?.title || "Subcategories"}
        </motion.h1>
        {category?.data?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-center mb-8"
          >
            {category.data.description}
          </motion.p>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {subCategories?.map((subCategory) => (
            <motion.div
              key={subCategory._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${subCategory._id}/products`)}
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-200"
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`${imageBase}${subCategory.image}`}
                  alt={subCategory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </motion.div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {subCategory.title}
                </h2>
                {subCategory.description && (
                  <p className="text-gray-600 text-sm line-clamp-2  ">
                    {subCategory.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {subCategories?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-600 text-xl mt-20"
          >
            No subcategories available in this category
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default SubCategories;
