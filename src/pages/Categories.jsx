import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCategories, imageBase } from "../services/apis";
import { Loader2 } from "lucide-react";
import logo from "../assets/final logo-03.png";
import bgImage from "../assets/bg.jpg";
import OffersSlider from "../components/OffersSlider";

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

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-24 md:h-32 object-contain" />
        </div>

        <OffersSlider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <div
              key={category._id}
              onClick={() =>
                navigate(`/category/${category._id}/subcategories`)
              }
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${imageBase}${category.image}`}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-2">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {categories?.length === 0 && (
          <div className="text-center text-gray-600 text-xl mt-20">
            No categories available
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
