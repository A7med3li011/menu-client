import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import logo from "../assets/final logo-03.png";
import { sendReview } from "../services/apis";

function Review() {
  const navigate = useNavigate();
  const [overallRating, setOverallRating] = useState(0);
  const [hoveredOverallRating, setHoveredOverallRating] = useState(0);
  const [hygieneRating, setHygieneRating] = useState(0);
  const [hoveredHygieneRating, setHoveredHygieneRating] = useState(0);
  const [tasteRating, setTasteRating] = useState(0);
  const [hoveredTasteRating, setHoveredTasteRating] = useState(0);
  const [wouldComeBack, setWouldComeBack] = useState(false);
  const [additionalComments, setAdditionalComments] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Reusable StarRating component
  const StarRating = ({ rating, setRating, hoveredRating, setHoveredRating }) => (
    <div className="flex justify-center gap-1 sm:gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none p-1"
        >
          <Star
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-200 ${
              star <= (hoveredRating || rating)
                ? "fill-popular text-popular"
                : "text-gray-300"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (overallRating === 0) {
      setError("Please rate your overall satisfaction");
      return;
    }

    if (hygieneRating === 0) {
      setError("Please rate the hygiene");
      return;
    }

    if (tasteRating === 0) {
      setError("Please rate the taste of food");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!mobileNumber.trim()) {
      setError("Please enter your mobile number");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await sendReview({
        overallRating: overallRating,
        hygieneRating: hygieneRating,
        tasteRating: tasteRating,
        wouldComeBack: wouldComeBack,
        additionalComments: additionalComments,
        name: name,
        mobileNumber: mobileNumber,
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setOverallRating(0);
        setHygieneRating(0);
        setTasteRating(0);
        setWouldComeBack(false);
        setAdditionalComments("");
        setName("");
        setMobileNumber("");
        setSubmitted(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.response?.data?.message || "Failed to submit review. Please try again.");
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
            <img src={logo} alt="Logo" className="h-12 sm:h-14 md:h-16 lg:h-20 object-contain" />
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
            <form onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base"
                >
                  {error}
                </motion.div>
              )}

              {/* Question 1: Overall Satisfaction */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-6 sm:mb-8"
              >
                <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  What is your overall satisfaction with our restaurant? *
                </label>
                <StarRating
                  rating={overallRating}
                  setRating={setOverallRating}
                  hoveredRating={hoveredOverallRating}
                  setHoveredRating={setHoveredOverallRating}
                />
                {overallRating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base"
                  >
                    {overallRating === 1 && "We're sorry to hear that"}
                    {overallRating === 2 && "We'll do better"}
                    {overallRating === 3 && "Thank you for your feedback"}
                    {overallRating === 4 && "We're glad you enjoyed it"}
                    {overallRating === 5 && "Amazing! Thank you so much!"}
                  </motion.p>
                )}
              </motion.div>

              {/* Question 2: Hygiene Rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mb-6 sm:mb-8"
              >
                <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  How would you rate the hygiene? *
                </label>
                <StarRating
                  rating={hygieneRating}
                  setRating={setHygieneRating}
                  hoveredRating={hoveredHygieneRating}
                  setHoveredRating={setHoveredHygieneRating}
                />
              </motion.div>

              {/* Question 3: Taste of Food */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6 sm:mb-8"
              >
                <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  How would you rate the taste of food? *
                </label>
                <StarRating
                  rating={tasteRating}
                  setRating={setTasteRating}
                  hoveredRating={hoveredTasteRating}
                  setHoveredRating={setHoveredTasteRating}
                />
              </motion.div>

              {/* Question 4: Would you come back checkbox */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mb-6 sm:mb-8"
              >
                <label className="flex items-center justify-center gap-2 sm:gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wouldComeBack}
                    onChange={(e) => setWouldComeBack(e.target.checked)}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-popular focus:ring-popular focus:ring-2 border-gray-300 rounded cursor-pointer"
                  />
                  <span className="text-gray-800 font-semibold text-sm sm:text-base">
                    Would you come back to eat with us again?
                  </span>
                </label>
              </motion.div>

              {/* Question 5: Additional Comments */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-4 sm:mb-6"
              >
                <label
                  htmlFor="additionalComments"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Is there anything else you want to tell us?
                </label>
                <textarea
                  id="additionalComments"
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                  rows="4"
                  placeholder="Share your thoughts with us..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all resize-none text-gray-800 text-sm sm:text-base"
                />
              </motion.div>

              {/* Question 6: Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mb-4 sm:mb-6"
              >
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base"
                  required
                />
              </motion.div>

              {/* Question 7: Mobile Number Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-6 sm:mb-8"
              >
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Mobile Number *
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all text-gray-800 text-sm sm:text-base"
                  required
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
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
