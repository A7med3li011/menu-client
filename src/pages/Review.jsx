import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import logo from "../assets/final logo-03.png";
import { sendReview } from "../services/apis";

function Review() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    firstVisit: false,
    tasteRating: 0,
    hygieneRating: 0,
    overallRating: 0,
    wouldComeBack: false,
    mobileNumber: "",
    email: "",
    additionalComments: "",
    howDidYouHear: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle star rating changes
  const handleRatingChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Star rating component
  const StarRating = ({ field, value, label }) => (
    <div className="mb-6 sm:mb-8">
      <label className="block text-gray-800 font-semibold mb-3 text-sm sm:text-base">
        {label}
      </label>
      <div className="flex gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRatingChange(field, star)}
            className="focus:outline-none p-1"
          >
            <Star
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-200 ${
                star <= value ? "fill-popular text-popular" : "text-gray-300"
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await sendReview(formData);

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        setFormData({
          name: "",
          firstVisit: false,
          tasteRating: 0,
          hygieneRating: 0,
          overallRating: 0,
          wouldComeBack: false,
          mobileNumber: "",
          email: "",
          additionalComments: "",
          howDidYouHear: "",
        });
        setSubmitted(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-3 sm:p-4 md:p-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-1 sm:gap-2 text-popular hover:text-popular/80 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Home</span>
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

          <div className="w-16 sm:w-24 md:w-32"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-gray-200"
        >
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center"
          >
            Share Your Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base"
          >
            We'd love to hear your feedback!
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 sm:py-12"
            >
              <div className="text-5xl sm:text-6xl mb-4">🎉</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Your review has been submitted successfully.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base"
                >
                  {error}
                </motion.div>
              )}

              {/* Question 1: First visit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.firstVisit}
                    onChange={(e) =>
                      handleChange("firstVisit", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-popular focus:ring-2 focus:ring-popular/20 cursor-pointer"
                  />
                  <span className="text-gray-800 font-semibold text-sm sm:text-base">
                    Is this your first time at our restaurant?
                  </span>
                </label>
              </motion.div>

              {/* Question 2: Overall satisfaction */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <StarRating
                  field="overallRating"
                  value={formData.overallRating}
                  label="What is overall your satisfaction with our restaurant?"
                />
              </motion.div>

              {/* Question 3: Hygiene rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <StarRating
                  field="hygieneRating"
                  value={formData.hygieneRating}
                  label="How would you rate the hygiene?"
                />
              </motion.div>

              {/* Question 4: Taste rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <StarRating
                  field="tasteRating"
                  value={formData.tasteRating}
                  label="How would you rate the taste of our food?"
                />
              </motion.div>

              {/* Question 5: Would come back */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wouldComeBack}
                    onChange={(e) =>
                      handleChange("wouldComeBack", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-popular focus:ring-2 focus:ring-popular/20 cursor-pointer"
                  />
                  <span className="text-gray-800 font-semibold text-sm sm:text-base">
                    Would you come back to eat at our restaurant again?
                  </span>
                </label>
              </motion.div>

              {/* Question 6: Additional comments */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <label
                  htmlFor="additionalComments"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Is there anything else you want to tell us?
                </label>
                <textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) =>
                    handleChange("additionalComments", e.target.value)
                  }
                  rows="4"
                  placeholder="Share your thoughts with us..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all resize-none text-gray-800 text-sm sm:text-base"
                />
              </motion.div>

              {/* Question 7: Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base"
                  required
                />
              </motion.div>

              {/* Question 8: Mobile number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  placeholder="Enter your mobile number (optional)"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base"
                />
              </motion.div>

              {/* Question 9: Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email (optional)"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base"
                />
              </motion.div>

              {/* Question 10: How did you hear about us */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <label
                  htmlFor="howDidYouHear"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  How did you hear about us?
                </label>
                <select
                  id="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={(e) =>
                    handleChange("howDidYouHear", e.target.value)
                  }
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="social_media">Social Media</option>
                  <option value="friend_family">Friend or Family</option>
                  <option value="google_search">Google Search</option>
                  <option value="passing_by">Passing By</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {/* Submit button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-popular text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-popular/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Review;
