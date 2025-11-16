import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { memo, useMemo } from "react";
import {
  getSubCategoriesByCategory,
  getCategory,
  imageBase,
} from "../services/apis";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "../assets/bg.jpg";
import logo from "../assets/final logo-03.png";

// Memoized SubCategory Card Component
const SubCategoryCard = memo(({ subCategory, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-secondary rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-200 transition-all duration-200 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${imageBase}${subCategory.image}`}
          alt={subCategory.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {subCategory.title}
        </h2>
        {subCategory.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {subCategory.description}
          </p>
        )}
      </div>
    </div>
  );
});

SubCategoryCard.displayName = "SubCategoryCard";

function SubCategories() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategory(categoryId),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const {
    data: subCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => getSubCategoriesByCategory(categoryId),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Memoize navigation handlers
  const handleBack = useMemo(() => () => navigate("/"), [navigate]);

  const handleSubCategoryClick = useMemo(
    () => (subCategoryId) => () =>
      navigate(`/subcategory/${subCategoryId}/products`),
    [navigate]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div
      className="min-h-screen bg-primary md:p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-[95%] md:max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-popular hover:text-popular/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Categories
          </button>

          <div className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>

          <div className="w-32"></div>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-5">
          {category?.data?.title || "Subcategories"}
        </h1>

        {category?.data?.description && (
          <p className="text-gray-600 text-center mb-8">
            {category.data.description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subCategories?.map((subCategory) => (
            <SubCategoryCard
              key={subCategory._id}
              subCategory={subCategory}
              onClick={handleSubCategoryClick(subCategory._id)}
            />
          ))}
        </div>

        {subCategories?.length === 0 && (
          <div className="text-center text-gray-600 text-xl mt-20">
            No subcategories available in this category
          </div>
        )}
      </div>
    </div>
  );
}

export default SubCategories;
