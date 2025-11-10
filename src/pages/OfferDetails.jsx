import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getOfferDetails, imageBase } from "../services/apis";
import { Loader2, ArrowLeft, Tag, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/final logo-03.png";

function OfferDetails() {
  const navigate = useNavigate();
  const { offerId } = useParams();

  const {
    data: offer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => getOfferDetails(offerId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-12 h-12 animate-spin text-popular" />
      </div>
    );
  }
  console.log(offer);

  if (error || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-red-500 text-xl">Error loading offer details</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary p-3 sm:p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-1 sm:gap-2 text-popular hover:text-popular/80 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Categories</span>
            <span className="sm:hidden">Back</span>
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

          <div className="w-16 sm:w-24 md:w-32 lg:w-40"></div>
        </div>

        {/* Offer Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-secondary rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] sm:min-h-[400px] overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={`${imageBase}${offer.image}`}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent lg:bg-gradient-to-r"></div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4"
              >
                {offer.title}
              </motion.h1>

              {offer.description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-4 sm:mb-6"
                >
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    {offer.description}
                  </p>
                </motion.div>
              )}

              {offer.priceAfterDiscount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-popular" />
                    <span className="text-popular text-3xl sm:text-4xl md:text-5xl font-bold">
                      ${offer.priceAfterDiscount}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2">Special Offer Price</p>
                </motion.div>
              )}

              {offer.isActive !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-4"
                >
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    offer.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${offer.isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className="text-sm font-semibold">
                      {offer.isActive ? 'Active Offer' : 'Offer Expired'}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Items Included Section */}
        {offer.items && offer.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-popular" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Items Included ({offer.items.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {offer.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-secondary rounded-lg sm:rounded-xl overflow-hidden shadow-md border border-gray-200"
                >
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                    <img
                      src={`${imageBase}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                    {item.available === false && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                        Unavailable
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {item.price && (
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="text-popular text-lg sm:text-xl font-bold">
                          ${item.price}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Regular Price
                        </span>
                      </div>
                    )}

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-300">
                        <p className="text-xs text-gray-500 font-semibold mb-1.5 sm:mb-2">
                          INGREDIENTS
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.slice(0, 4).map((ingredient, idx) => (
                            <span
                              key={idx}
                              className="bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-gray-700 text-xs border border-gray-300"
                            >
                              {typeof ingredient === "string"
                                ? ingredient
                                : ingredient.title || ingredient.name}
                            </span>
                          ))}
                          {item.ingredients.length > 4 && (
                            <span className="text-gray-500 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1">
                              +{item.ingredients.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default OfferDetails;
