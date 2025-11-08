import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategories, imageBase } from "../services/apis";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/final logo-03.png";

function Categories() {
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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
        <div className="text-red-500 text-xl">Error loading categories</div>
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
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <img src={logo} alt="Logo" className="h-24 md:h-32 object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Categories
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories?.map((category, index) => (
            <motion.div
              key={category._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                navigate(`/category/${category._id}/subcategories`)
              }
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`${imageBase}${category.image}`}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
              </motion.div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {categories?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-400 text-xl mt-20"
          >
            No categories available
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Categories;
