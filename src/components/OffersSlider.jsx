import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getOffers, imageBase } from "../services/apis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
        modules={[Autoplay, Pagination]}
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
      `}</style>
    </motion.div>
  );
}

export default OffersSlider;
