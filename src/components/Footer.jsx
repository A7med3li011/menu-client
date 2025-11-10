import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Facebook, Instagram, MessageCircle, MapPin } from "lucide-react";

function Footer() {
  const navigate = useNavigate();

  // Social media links - update these with actual URLs
  const socialMedia = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "hover:text-[#1877F2]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:text-[#E4405F]",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/1234567890", // Replace with actual WhatsApp number
      color: "hover:text-[#25D366]",
    },
    {
      name: "Location",
      icon: MapPin,
      url: "https://share.google/uLGRIyqUe02t0zdRL", // Replace with actual Google Maps link
      color: "hover:text-[#EA4335]",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/95 backdrop-blur-sm border-t border-gray-700 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col gap-4">
          {/* Top Section - Social Media & Review Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialMedia.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>

            {/* Review Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/review")}
              className="flex items-center gap-1.5 sm:gap-2 bg-popular text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold hover:bg-popular/90 transition-colors shadow-lg text-sm sm:text-base"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              Leave a Review
            </motion.button>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="text-gray-400 text-xs sm:text-sm text-center pt-3 border-t border-gray-700">
            <p>
              © {new Date().getFullYear()} All rights reserved by station one
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
