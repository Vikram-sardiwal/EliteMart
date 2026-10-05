import { useEffect, useState } from "react";
import API from "../services/api";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);


  const fetchReviews = async () => {
    try {
      const response = await API.get(`/review/${productId}`);

      setReviews(response.data.reviews || []);
    } catch (error) {
      console.log(
        "Reviews fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(`/review/${productId}`, {
        rating,
        comment,
      });

      console.log(response.data);

      alert("Review added successfully!");

      setRating(0);
      setComment("");

      await fetchReviews();
    } catch (error) {
      console.log(
        "Review create error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/review/${reviewId}`);

      alert("Review deleted successfully!");

      await fetchReviews();
    } catch (error) {
      console.log(
        "Review delete error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Review delete nahi ho paaya"
      );
    }
  };

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">

      
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            CUSTOMER REVIEWS
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {reviews.length} review
            {reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

      </div>


      
      <div className="border border-gray-200 bg-gray-50 p-6 md:p-8 mb-12">

        <h3 className="text-lg font-semibold text-gray-900 mb-7">
          WRITE A REVIEW
        </h3>


        
        <div className="mb-7">

          <p className="text-xs font-semibold tracking-wider text-gray-600 uppercase mb-3">
            Your Rating
          </p>

          <div className="flex items-center gap-2">

            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-all ${
                  star <= rating
                    ? "text-black"
                    : "text-gray-300"
                } hover:text-black`}
              >
                ★
              </button>
            ))}

          </div>

        </div>


        
        <div>

          <label className="block text-xs font-semibold tracking-wider text-gray-600 uppercase mb-3">
            Your Review
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            rows="5"
            className="w-full bg-white border border-gray-300 px-4 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black transition resize-none"
          />

        </div>


      
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 bg-black text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "SUBMITTING..." : "SUBMIT REVIEW"}
        </button>

      </div>


            <div>

        {fetchLoading ? (

          <div className="py-12 text-center">
            <p className="text-sm text-gray-500">
              Loading reviews...
            </p>
          </div>

        ) : reviews.length === 0 ? (

          <div className="border-t border-b border-gray-200 py-16 text-center">

            <div className="text-3xl text-gray-300 mb-4">
              ★
            </div>

            <p className="text-sm font-semibold text-gray-800">
              NO REVIEWS YET
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Be the first to review this product.
            </p>

          </div>

        ) : (

          <div>

            
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-0">

              <h3 className="text-sm font-semibold tracking-wider text-gray-900">
                CUSTOMER FEEDBACK
              </h3>

              <span className="text-xs text-gray-500">
                {reviews.length} REVIEWS
              </span>

            </div>


            {/* Reviews */}
            {reviews.map((review) => (

              <div
                key={review._id}
                className="border-b border-gray-200 py-7"
              >

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  {/* User */}
                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
                        {review.user?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div>

                        <h4 className="text-sm font-semibold text-gray-900">
                          {review.user?.name || "User"}
                        </h4>

                        <p className="text-xs text-gray-400 mt-1">
                          {review.createdAt
                            ? new Date(
                                review.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </p>

                      </div>

                    </div>


                    
                    <p className="mt-5 text-sm text-gray-600 leading-6 max-w-3xl">
                      {review.comment}
                    </p>


                  
                    <button
                      onClick={() =>
                        handleDelete(review._id)
                      }
                      className="mt-5 text-xs text-gray-400 hover:text-black underline underline-offset-4 transition"
                    >
                      Delete review
                    </button>

                  </div>


                  
                  <div className="text-sm tracking-widest text-black whitespace-nowrap">
                    {"★".repeat(review.rating)}
                    <span className="text-gray-300">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}