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
      className="min-h-screen bg-primary p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

          <div className="w-40"></div>
        </div>

        {/* Offer Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-secondary rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 lg:h-full min-h-[400px] overflow-hidden"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={`${imageBase}${offer.image}`}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent lg:bg-gradient-to-r"></div>
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
                {offer.title}
              </motion.h1>

              {offer.description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-6"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {offer.description}
                  </p>
                </motion.div>
              )}

              {offer.priceAfterDiscount && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3">
                    <Tag className="w-6 h-6 text-popular" />
                    <span className="text-popular text-5xl font-bold">
                      {offer.priceAfterDiscount} EG
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    Special Offer Price
                  </p>
                </motion.div>
              )}

              {offer.isActive !== undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-4"
                >
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      offer.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        offer.isActive ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span className="text-sm font-semibold">
                      {offer.isActive ? "Active Offer" : "Offer Expired"}
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
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-7 h-7 text-popular" />
              <h2 className="text-3xl font-bold text-gray-800">
                Items Included ({offer.items.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offer.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-secondary rounded-xl overflow-hidden shadow-md border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${imageBase}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
                    {item.available === false && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Unavailable
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {item.price && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-popular text-xl font-bold">
                          {item.price} EG
                        </span>
                        <span className="text-gray-500 text-xs">
                          Regular Price
                        </span>
                      </div>
                    )}

                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <p className="text-xs text-gray-500 font-semibold mb-2">
                          INGREDIENTS
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients
                            .slice(0, 4)
                            .map((ingredient, idx) => (
                              <span
                                key={idx}
                                className="bg-white px-2 py-1 rounded-md text-gray-700 text-xs border border-gray-300"
                              >
                                {typeof ingredient === "string"
                                  ? ingredient
                                  : ingredient.title || ingredient.name}
                              </span>
                            ))}
                          {item.ingredients.length > 4 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
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
