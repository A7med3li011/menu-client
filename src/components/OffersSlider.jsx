import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOffers, imageBase } from "../services/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function OffersSlider() {
  const navigate = useNavigate();
  const {
    data: offers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-popular" />
      </div>
    );
  }

  if (error || !offers || offers.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full mb-8"
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={offers.length > 1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="offers-swiper"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer._id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-lg overflow-hidden shadow-lg h-48 md:h-64 "
            >
              <img
                src={`${imageBase}${offer.image}`}
                alt={offer.title || "Offer"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {offer.title && (
                    <h3 className="text-white text-xl font-bold mb-1">
                      {offer.title}
                    </h3>
                  )}
                  {offer.description && (
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {offer.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .offers-swiper {
          padding-bottom: 2.5rem;
        }
        .offers-swiper .swiper-pagination {
          bottom: 0;
        }
        .offers-swiper .swiper-pagination-bullet {
          background: #666;
          opacity: 0.5;
        }
        .offers-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #d4a574;
        }
        .offers-swiper .swiper-button-next,
        .offers-swiper .swiper-button-prev {
          color: #fff;
          background: rgba(212, 165, 116, 0.7);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .offers-swiper .swiper-button-next:after,
        .offers-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        @media (max-width: 640px) {
          .offers-swiper .swiper-button-next,
          .offers-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default OffersSlider;
