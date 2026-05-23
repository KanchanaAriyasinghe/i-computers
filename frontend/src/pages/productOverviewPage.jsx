import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import api from "../utils/api"
import toast from "react-hot-toast"
import LoadingAnimation from "../componenets/loadingAnimation"
import ImageSlideShow from "../componenets/imageSlideShow"
import getFormattedPrice from "../utils/price-format"
import { addToCart } from "../utils/cart"


const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")

// ─── Star Rating Display ───────────────────────────────────────────────────────
function StarDisplay({ rating, size = "md" }) {
    const sizes = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }
    return (
        <div className={`flex gap-0.5 ${sizes[size]}`}>
            {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                </span>
            ))}
        </div>
    )
}


function StarInput({ value, onChange }) {
    const [hovered, setHovered] = useState(0)
    return (
        <div className="flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    className={`cursor-pointer transition-colors duration-150 ${
                        star <= (hovered || value) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(star)}
                >
                    ★
                </span>
            ))}
        </div>
    )
}


function WriteReviewModal({ productId, onClose, onSuccess }) {
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)

    function handleSubmit() {
        if (rating === 0) return toast.error("Please select a rating")
        if (!title.trim()) return toast.error("Please enter a review title")
        if (!comment.trim()) return toast.error("Please enter your review")

        setSubmitting(true)
        const token = localStorage.getItem("token")

        axios.post(
            `${BASE}/reviews`,
            { productId, rating, title, comment },
            { headers: { Authorization: "Bearer " + token } }
        ).then(() => {
            toast.success("Review posted successfully!")
            onSuccess()
            onClose()
        }).catch(err => {
            toast.error(err?.response?.data?.message || "Failed to post review")
        }).finally(() => setSubmitting(false))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold text-gray-800">Write a Review</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <StarInput value={rating} onChange={setRating} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Summarize your experience"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength={100}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        rows={4}
                        placeholder="Share your experience with this product..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        maxLength={1000}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-1 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {submitting ? "Posting..." : "Post Review"}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Reviews Section ───────────────────────────────────────────────────────────
function ReviewsSection({ productId }) {
    const [reviews, setReviews] = useState([])
    const [summary, setSummary] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [ratingFilter, setRatingFilter] = useState("")
    const [sort, setSort] = useState("newest")
    const [showModal, setShowModal] = useState(false)
    const [helpfulClicked, setHelpfulClicked] = useState({})

    const isLoggedIn = !!localStorage.getItem("token")

    function fetchReviews(pg = 1, rf = "", s = "newest") {
        setLoading(true)
        let url = `${BASE}/reviews/product/${productId}?page=${pg}&pageSize=5&sort=${s}`
        if (rf) url += `&rating=${rf}`

        axios.get(url)
            .then(res => {
                const d = res.data || {}
                setReviews(d.reviews || [])
                setSummary(d.summary || null)
                setTotalPages(d.totalPages || 1)
            })
            .catch(err => {
                console.error("Reviews fetch error:", err)
                setReviews([])
                setSummary(null)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (productId) fetchReviews(1, "", "newest")
    }, [productId])

    function handleRatingFilter(val) {
        setRatingFilter(val)
        setPage(1)
        fetchReviews(1, val, sort)
    }

    function handleSort(val) {
        setSort(val)
        setPage(1)
        fetchReviews(1, ratingFilter, val)
    }

    function handlePageChange(pg) {
        setPage(pg)
        fetchReviews(pg, ratingFilter, sort)
    }

    function handleHelpful(reviewId) {
        if (!isLoggedIn) return toast.error("Please login to mark as helpful")
        if (helpfulClicked[reviewId]) return
        const token = localStorage.getItem("token")
        axios.put(
            `${BASE}/reviews/${reviewId}/helpful`,
            {},
            { headers: { Authorization: "Bearer " + token } }
        ).then(res => {
            setHelpfulClicked(prev => ({ ...prev, [reviewId]: true }))
            setReviews(prev => prev.map(r =>
                r._id === reviewId ? { ...r, helpfulCount: res.data.helpfulCount } : r
            ))
        }).catch(err => toast.error(err?.response?.data?.message || "Failed"))
    }

    function handleReport(reviewId) {
        if (!isLoggedIn) return toast.error("Please login to report")
        const token = localStorage.getItem("token")
        axios.put(
            `${BASE}/reviews/${reviewId}/report`,
            {},
            { headers: { Authorization: "Bearer " + token } }
        ).then(() => {
            toast.success("Review reported")
            fetchReviews(page, ratingFilter, sort)
        }).catch(() => toast.error("Failed to report"))
    }

    return (
        <div className="w-full mt-10 px-5 pb-10">
            {showModal && (
                <WriteReviewModal
                    productId={productId}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setPage(1)
                        fetchReviews(1, ratingFilter, sort)
                    }}
                />
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                <button
                    onClick={() => {
                        if (!isLoggedIn) return toast.error("Please login to write a review")
                        setShowModal(true)
                    }}
                    className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Write a Review
                </button>
            </div>

            {/* Rating Summary */}
            {summary && summary.totalReviews > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center min-w-[160px]">
                        <span className="text-5xl font-bold text-gray-800">{summary.avgRating}</span>
                        <StarDisplay rating={summary.avgRating} size="lg" />
                        <span className="text-sm text-gray-500 mt-1">Based on {summary.totalReviews} reviews</span>
                    </div>

                    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = summary.ratingCounts?.[star] || 0
                            const pct = summary.totalReviews > 0
                                ? Math.round((count / summary.totalReviews) * 100)
                                : 0
                            return (
                                <div key={star} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-gray-600 w-12 shrink-0">{star} Star</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-accent h-2.5 rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 w-20 text-right">{count} ({pct}%)</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center gap-3 min-w-[220px]">
                        <h3 className="font-semibold text-gray-800">Share your experience</h3>
                        <p className="text-sm text-gray-500">Have you used this product? Share your thoughts with others.</p>
                        <button
                            onClick={() => {
                                if (!isLoggedIn) return toast.error("Please login to write a review")
                                setShowModal(true)
                            }}
                            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            Write a Review
                        </button>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
                <select
                    value={ratingFilter}
                    onChange={e => handleRatingFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="">All Ratings</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                </select>
                <select
                    value={sort}
                    onChange={e => handleSort(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="helpful">Most Helpful</option>
                </select>
            </div>

            {/* Reviews List */}
            {loading ? (
                <div className="flex justify-center py-10"><LoadingAnimation /></div>
            ) : reviews.length === 0 ? (
                <div className="text-center lg:py-12  text-gray-400">
                    <p className="text-5xl mb-3">💬</p>
                    <p className="text-lg font-medium">No reviews yet</p>
                    <p className="text-sm">Be the first to review this product!</p>
                </div>
            ) : (
                <div className="flex flex-col mb-[160px] lg:mb-0 gap-4">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={review.userImage || "/images/default-profile.png"}
                                        alt={review.userFirstName}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        onError={e => { e.target.src = "/images/default-profile.png" }}
                                    />
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-gray-800">
                                                {review.userFirstName} {review.userLastName?.charAt(0)}.
                                            </span>
                                            <span className="text-xs text-green-600 font-medium">✓ Verified Purchase</span>
                                        </div>
                                        <StarDisplay rating={review.rating} size="sm" />
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric", month: "long", day: "numeric"
                                    })}
                                </span>
                            </div>

                            <h4 className="font-semibold text-gray-800 mt-3">{review.title}</h4>
                            <p className="text-gray-600 text-sm mt-1 leading-relaxed">{review.comment}</p>

                            <div className="flex items-center gap-5 mt-4">
                                <button
                                    onClick={() => handleHelpful(review._id)}
                                    disabled={helpfulClicked[review._id]}
                                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                                        helpfulClicked[review._id]
                                            ? "text-accent font-medium"
                                            : "text-gray-400 hover:text-accent"
                                    }`}
                                >
                                    👍 Helpful ({review.helpfulCount})
                                </button>
                                <button
                                    onClick={() => handleReport(review._id)}
                                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    🚩 Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-40"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                        <button
                            key={pg}
                            onClick={() => handlePageChange(pg)}
                            className={`px-3 py-1 rounded transition-colors ${
                                pg === page ? "bg-accent text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {pg}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ProductOverviewPage() {

    const Paramerters = useParams()
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        api.get("/products/" + Paramerters.productId).then(
            (response) => {
                setProduct(response.data)
                setStatus("success")
            }
        ).catch((error) => {
            toast.error(error?.response?.data?.message || "An error occurred while fetching product details.")
            setStatus("error")
        })
    }, [])

    return (
        // KEY FIX: removed h-full and items-center — these were capping height
        // and vertically centering the content, causing the top to be cut off.
        // Now the page grows naturally with its content and scrolls normally.
        <div className="w-full min-h-screen flex flex-col">
            {status === "loading" && (
                <div className="flex-1 flex items-center justify-center">
                    <LoadingAnimation />
                </div>
            )}
            {status === "error" && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 h-[300px]">
                    <h1 className="text-2xl font-bold">Failed to load product details.</h1>
                    <Link to="/products" className="px-4 py-2 bg-accent text-white rounded">Back to Products</Link>
                </div>
            )}
            {status === "success" && (
                <div className="w-full flex flex-col pb-10">

                    {/* Product Details */}
                    <div className="w-full flex lg:flex-row flex-col">
                        <div className="w-full lg:w-1/2 flex justify-center items-start pt-5">
                            <ImageSlideShow images={product.images} />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col p-5">
                            <h1 className="text-3xl font-bold">{product.name}
                                {product.altNames.map((alterantiveName, index) => (
                                    <span key={index} className="text-gray-500"> | {alterantiveName}</span>
                                ))}
                            </h1>
                            <h2 className="text-sm text-gray-500 mt-5">{product.productId}</h2>
                            <div className="w-full mt-5 flex flex-col">
                                <p className="text-accent font-semibold text-4xl">
                                    {getFormattedPrice(product.price)}
                                </p>
                                {product.labeledPrice > product.price &&
                                    <span className="text-xl text-gray-500 line-through">
                                        {getFormattedPrice(product.labeledPrice)}
                                    </span>
                                }
                                <div className="w-full mt-5 flex gap-10">
                                    <span className="text-lg text-gray-500">
                                        <span className="text-gray-800 font-semibold">{product.brand}</span>
                                    </span>
                                    <span className="text-lg text-gray-500">
                                        <span className="text-gray-800 font-semibold">{product.model}</span>
                                    </span>
                                </div>
                                <div className="w-full mt-5 flex gap-10">
                                    <span className="text-lg text-gray-500">
                                        <span className="text-gray-800 font-semibold">{product.category}</span>
                                    </span>
                                </div>
                                <p className="text-lg mt-5 lg:mb-0">
                                    {product.description}
                                </p>
                                <div className="flex mt-5 gap-5 fixed lg:static bottom-[82px] right-0 p-2 backdrop-blur-2xl lg:backdrop-blur-none w-full">
                                    <button
                                        className="w-62.5 h-16 bg-green-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300"
                                        onClick={() => {
                                            addToCart(product, 1)
                                            toast.success(product.name + " added to cart")
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                    <Link
                                        className="w-62.5 h-16 bg-blue-500 flex items-center justify-center text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
                                        to="/checkout"
                                        state={[{
                                            product: {
                                                productId: product.productId,
                                                name: product.name,
                                                image: product.images[0],
                                                labeledPrice: product.labeledPrice,
                                                price: product.price,
                                            },
                                            quantity: 1
                                        }]}
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <ReviewsSection productId={Paramerters.productId} />

                </div>
            )}
        </div>
    )
}