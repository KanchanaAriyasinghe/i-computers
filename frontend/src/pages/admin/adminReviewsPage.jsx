import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../componenets/loadingAnimation";
import { MdDelete } from "react-icons/md";
import { MdOutlineHideSource } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";

// ─── Star Display ──────────────────────────────────────────────────────────────
function StarDisplay({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
        </div>
    )
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const styles = {
        published: "bg-green-100 text-green-600",
        hidden:    "bg-gray-100 text-gray-600",
        reported:  "bg-red-100 text-red-600"
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs capitalize ${styles[status] || styles.published}`}>
            {status}
        </span>
    )
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, iconBg }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${iconBg}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value?.toLocaleString()}</p>
                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    )
}

// ─── Review Details Modal ──────────────────────────────────────────────────────
function ReviewDetailsModal({ review, onClose, onStatusUpdate, onDelete }) {
    if (!review) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-md w-full max-w-lg overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header — matches page header style */}
                <div className="w-full h-[70px] rounded-t-xl   text-black flex items-center px-6 justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-wide">Review Details</h2>
                        <p className="text-xs opacity-80">Full review information</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-black opacity-70 hover:opacity-100 text-2xl leading-none transition-opacity duration-200"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">

                    {/* Customer Row */}
                    <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-200">
                        <img
                            src={review.userImage || "/images/default-profile.png"}
                            alt={review.userFirstName}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
                            onError={e => { e.target.src = "/images/default-profile.png" }}
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{review.userFirstName} {review.userLastName}</p>
                            <p className="text-gray-400 text-xs">{review.userEmail}</p>
                        </div>
                        <StatusBadge status={review.status} />
                    </div>

                    {/* Rating & Date */}
                    <div className="flex items-center justify-between mb-4">
                        <StarDisplay rating={review.rating} />
                        <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Review Title */}
                    <p className="font-semibold text-gray-800 mb-2">{review.title}</p>

                    {/* Review Comment */}
                    <div className="bg-gray-100 rounded-lg p-3 mb-5">
                        <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Product ID Row */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                        <span className="text-xs text-gray-500 uppercase font-medium">Product ID</span>
                        <span className="text-sm font-semibold text-gray-800">{review.productId}</span>
                    </div>

                    {/* Helpful Count */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs text-gray-500 uppercase font-medium">Helpful Votes</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                            👍 {review.helpfulCount ?? 0}
                        </span>
                    </div>

                    {/* Action Buttons — same style as pagination buttons */}
                    <div className="flex items-center gap-3">
                        {review.status === "published" ? (
                            <button
                                onClick={() => { onStatusUpdate(review._id, "hidden"); onClose() }}
                                className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                            >
                                <MdOutlineHideSource className="text-base" /> Hide
                            </button>
                        ) : (
                            <button
                                onClick={() => { onStatusUpdate(review._id, "published"); onClose() }}
                                className="flex-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors duration-200 text-sm"
                            >
                                Publish
                            </button>
                        )}
                        <button
                            onClick={() => { onDelete(review._id); onClose() }}
                            className="flex-1 px-3 py-1 bg-red-100 text-red-500 rounded hover:bg-red-200 transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                        >
                            <MdDelete className="text-base" /> Delete
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)

    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [ratingFilter, setRatingFilter] = useState("")

    const [selectedReview, setSelectedReview] = useState(null)

    useEffect(() => {
        if (!isLoaded) {
            const token = localStorage.getItem("token")
            const params = new URLSearchParams()
            if (statusFilter) params.append("status", statusFilter)
            if (ratingFilter) params.append("rating", ratingFilter)
            if (search) params.append("search", search)

            axios.get(
                `${import.meta.env.VITE_API_URL}/reviews/all/${pageSize}/${currentPage}?${params.toString()}`,
                { headers: { Authorization: "Bearer " + token } }
            ).then(res => {
                setReviews(res.data.reviews)
                setStats(res.data.stats)
                setTotal(res.data.total)
                setTotalPages(res.data.totalPages)
                setIsLoaded(true)
            }).catch(err => {
                console.log(err)
                toast.error("Failed to load reviews")
                setIsLoaded(true)
            })
        }
    }, [isLoaded])

    function applyFilters() {
        setSearch(searchInput)
        setCurrentPage(1)
        setIsLoaded(false)
    }

    function handleStatusUpdate(reviewId, newStatus) {
        const token = localStorage.getItem("token")
        axios.put(
            `${import.meta.env.VITE_API_URL}/reviews/${reviewId}/status`,
            { status: newStatus },
            { headers: { Authorization: "Bearer " + token } }
        ).then(() => {
            toast.success(`Review ${newStatus}`)
            setIsLoaded(false)
        }).catch(() => toast.error("Failed to update review status"))
    }

    function handleDelete(reviewId) {
        if (!window.confirm("Are you sure you want to delete this review? This cannot be undone.")) return
        const token = localStorage.getItem("token")
        axios.delete(
            `${import.meta.env.VITE_API_URL}/reviews/${reviewId}`,
            { headers: { Authorization: "Bearer " + token } }
        ).then(() => {
            toast.success("Review deleted")
            setIsLoaded(false)
        }).catch(() => toast.error("Failed to delete review"))
    }

    return (
        <div className="w-full h-full overflow-y-auto p-6 bg-gray-100 rounded-lg">

            {/* Review Details Modal */}
            {selectedReview && (
                <ReviewDetailsModal
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                    onStatusUpdate={handleStatusUpdate}
                    onDelete={handleDelete}
                />
            )}

            {/* Header */}
            <div className="sticky top-0 z-10 w-full h-[90px] rounded-xl bg-gradient-to-r from-accent to-primary text-white flex items-center px-6 justify-between shadow-lg mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-wide">Reviews</h1>
                    <p className="text-sm opacity-80">Manage your store Reviews with ease</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Total Reviews: <span className="font-semibold text-gray-800">{total}</span>
                    </span>
                </div>
            </div>

            {/* Stat Cards */}
            {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard icon=<MdReviews /> label="Total Reviews" value={stats.total} iconBg="bg-gray-100 text-yellow-400" />
                    <StatCard icon=<MdPublishedWithChanges /> label="Published" value={stats.published} sub={stats.total ? `${Math.round((stats.published / stats.total) * 100)}% of total` : ""} iconBg="bg-green-100 text-green-600" />
                    <StatCard icon=<MdOutlineHideSource/> label="Hidden" value={stats.hidden} sub={stats.total ? `${Math.round((stats.hidden / stats.total) * 100)}% of total` : ""} iconBg="bg-gray-100 text-gray-500" />
                    <StatCard icon="🚩" label="Reported" value={stats.reported} sub={stats.total ? `${Math.round((stats.reported / stats.total) * 100)}% of total` : ""} iconBg="bg-red-100 text-red-500" />
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-5 flex flex-wrap gap-3 items-center">
                <input
                    type="text"
                    placeholder="Search by review, customer or product..."
                    className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && applyFilters()}
                />
                <select
                    value={ratingFilter}
                    onChange={e => { setRatingFilter(e.target.value); setCurrentPage(1); setIsLoaded(false) }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    <option value="">All Ratings</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); setIsLoaded(false) }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="hidden">Hidden</option>
                    <option value="reported">Reported</option>
                </select>
                <button
                    onClick={applyFilters}
                    className="px-3 py-1 bg-accent text-white rounded hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            {!isLoaded ? (
                <LoadingAnimation />
            ) : (
                <>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                        <table className="w-full text-sm text-gray-700">

                            <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                                <tr>
                                    <th className="p-4">Review</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Rating</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reviews.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-gray-400">
                                            No reviews found
                                        </td>
                                    </tr>
                                ) : reviews.map(review => (
                                    <tr
                                        key={review._id}
                                        className="border-b hover:bg-gray-50 transition duration-200 cursor-pointer"
                                        onClick={() => setSelectedReview(review)}
                                    >
                                        {/* Review */}
                                        <td className="p-3 max-w-[200px]">
                                            <p className="font-semibold text-gray-800">{review.title}</p>
                                            <p className="text-gray-400 text-xs line-clamp-2 mt-0.5">{review.comment}</p>
                                        </td>

                                        {/* Customer */}
                                        <td className="p-3 text-center">
                                            <div className="flex items-center gap-2 justify-center">
                                                <img
                                                    src={review.userImage || "/images/default-profile.png"}
                                                    alt={review.userFirstName}
                                                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                                                    onError={e => { e.target.src = "/images/default-profile.png" }}
                                                />
                                                <div className="text-left">
                                                    <p className="font-semibold">{review.userFirstName} {review.userLastName}</p>
                                                    <p className="text-gray-400 text-xs">{review.userEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Product */}
                                        <td className="p-3 text-center font-medium">{review.productId}</td>

                                        {/* Rating */}
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center">
                                                <StarDisplay rating={review.rating} />
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="p-3 text-center">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* Status */}
                                        <td className="p-3 text-center">
                                            <StatusBadge status={review.status} />
                                        </td>

                                        {/* Actions — stopPropagation prevents row click opening modal */}
                                        <td
                                            className="p-3"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {review.status === "published" ? (
                                                    <button
                                                        title="Hide Review"
                                                        onClick={() => handleStatusUpdate(review._id, "hidden")}
                                                        className="px-2 py-1 rounded-full text-2xl transition-colors duration-200"
                                                    >
                                                        <MdOutlineHideSource />
                                                    </button>
                                                ) : (
                                                    <button
                                                        title="Publish Review"
                                                        onClick={() => handleStatusUpdate(review._id, "published")}
                                                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs hover:bg-blue-200 transition-colors duration-200"
                                                    >
                                                        Publish
                                                    </button>
                                                )}
                                                <button
                                                    title="Delete Review"
                                                    onClick={() => handleDelete(review._id)}
                                                    className="px-2 py-1 rounded-full text-2xl transition-colors duration-200"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="w-full flex justify-end items-center gap-3 mt-4">
                        <button
                            onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1); setIsLoaded(false) } }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => { if (currentPage < totalPages) { setCurrentPage(currentPage + 1); setIsLoaded(false) } }}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            Next
                        </button>
                        <select
                            value={pageSize}
                            onChange={e => { setPageSize(parseInt(e.target.value)); setCurrentPage(1); setIsLoaded(false) }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </>
            )}
        </div>
    )
}