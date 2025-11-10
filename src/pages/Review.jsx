import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import logo from "../assets/final logo-03.png";
import { sendReview } from "../services/apis";

function Review() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await sendReview({
        rate: rating,
        comment: comment,
        name: name,
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setRating(0);
        setName("");
        setComment("");
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

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
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

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mb-6 sm:mb-8"
              >
                <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  How would you rate your experience? *
                </label>
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
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base"
                  >
                    {rating === 1 && "We're sorry to hear that"}
                    {rating === 2 && "We'll do better"}
                    {rating === 3 && "Thank you for your feedback"}
                    {rating === 4 && "We're glad you enjoyed it"}
                    {rating === 5 && "Amazing! Thank you so much!"}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mb-6 sm:mb-8"
              >
                <label
                  htmlFor="comment"
                  className="block text-gray-800 font-semibold mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Tell us more (optional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  placeholder="Share your thoughts with us..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:border-popular focus:ring-2 focus:ring-popular/20 outline-none transition-all resize-none text-gray-800 text-sm sm:text-base"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
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
