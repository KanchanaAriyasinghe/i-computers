import Review from "../models/review.js";
import User from "../models/user.js";
import { isAdmin } from "./userController.js";

// POST /reviews  - Create a new review (logged-in users only)
export async function createReview(req, res) {
    if (req.user == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { productId, rating, title, comment } = req.body;

        if (!productId || !rating || !title || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // JWT payload does not contain _id — look up the real user document
        const userDoc = await User.findOne({ email: req.user.email });
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        // One review per user per product
        const existing = await Review.findOne({
            productId,
            userId: userDoc._id
        });

        if (existing) {
            return res.status(400).json({ message: "You have already reviewed this product" });
        }

        const newReview = new Review({
            productId,
            userId: userDoc._id,
            userEmail: userDoc.email,
            userFirstName: userDoc.firstName,
            userLastName: userDoc.lastName,
            userImage: userDoc.image,
            rating,
            title,
            comment
        });

        await newReview.save();
        res.status(201).json({ message: "Review posted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating review" });
    }
}

// GET /reviews/product/:productId  - Get published reviews for a product
export async function getProductReviews(req, res) {
    try {
        const { productId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;
        const sort = req.query.sort || "newest";

        let filter = { productId, status: "published" };
        if (ratingFilter) filter.rating = ratingFilter;

        let sortOption = {};
        if (sort === "newest")       sortOption = { createdAt: -1 };
        else if (sort === "oldest")  sortOption = { createdAt: 1 };
        else if (sort === "highest") sortOption = { rating: -1 };
        else if (sort === "lowest")  sortOption = { rating: 1 };
        else if (sort === "helpful") sortOption = { helpfulCount: -1 };

        const total = await Review.countDocuments(filter);
        const totalPages = Math.ceil(total / pageSize);

        const reviews = await Review.find(filter)
            .sort(sortOption)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        // Rating summary (all published, ignoring current filter)
        const allReviews = await Review.find({ productId, status: "published" });
        const totalReviews = allReviews.length;
        const avgRating = totalReviews > 0
            ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
            : 0;

        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        allReviews.forEach(r => ratingCounts[r.rating]++);

        res.json({
            reviews,
            total,
            totalPages,
            currentPage: page,
            summary: {
                avgRating: parseFloat(avgRating),
                totalReviews,
                ratingCounts
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
}

// GET /reviews/all/:pageSize/:currentPage  - Admin: get all reviews
export async function getAllReviews(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        const pageSize = parseInt(req.params.pageSize) || 10;
        const currentPage = parseInt(req.params.currentPage) || 1;
        const statusFilter = req.query.status || null;
        const ratingFilter = req.query.rating ? parseInt(req.query.rating) : null;
        const search = req.query.search || null;

        let filter = {};
        if (statusFilter && statusFilter !== "all") filter.status = statusFilter;
        if (ratingFilter) filter.rating = ratingFilter;
        if (search) {
            filter.$or = [
                { comment:       { $regex: search, $options: "i" } },
                { title:         { $regex: search, $options: "i" } },
                { userFirstName: { $regex: search, $options: "i" } },
                { userLastName:  { $regex: search, $options: "i" } },
                { userEmail:     { $regex: search, $options: "i" } },
                { productId:     { $regex: search, $options: "i" } }
            ];
        }

        const total = await Review.countDocuments(filter);
        const totalPages = Math.ceil(total / pageSize);

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        // Stats
        const totalAll       = await Review.countDocuments();
        const totalPublished = await Review.countDocuments({ status: "published" });
        const totalHidden    = await Review.countDocuments({ status: "hidden" });
        const totalReported  = await Review.countDocuments({ status: "reported" });

        res.json({
            reviews,
            total,
            totalPages,
            stats: {
                total: totalAll,
                published: totalPublished,
                hidden: totalHidden,
                reported: totalReported
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
}

// PUT /reviews/:reviewId/status  - Admin: update review status
export async function updateReviewStatus(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        const { reviewId } = req.params;
        const { status } = req.body;

        if (!["published", "hidden", "reported"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        await Review.findByIdAndUpdate(reviewId, { status });
        res.json({ message: "Review status updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating review status" });
    }
}

// DELETE /reviews/:reviewId  - Admin: delete review
export async function deleteReview(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review" });
    }
}

// PUT /reviews/:reviewId/helpful  - User: mark review as helpful
export async function markHelpful(req, res) {
    if (req.user == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        const email = req.user.email;
        if (review.helpfulVoters.includes(email)) {
            return res.status(400).json({ message: "Already marked as helpful" });
        }

        review.helpfulVoters.push(email);
        review.helpfulCount += 1;
        await review.save();

        res.json({ message: "Marked as helpful", helpfulCount: review.helpfulCount });

    } catch (error) {
        res.status(500).json({ message: "Error marking review" });
    }
}

// PUT /reviews/:reviewId/report  - User: report a review
export async function reportReview(req, res) {
    if (req.user == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        await Review.findByIdAndUpdate(req.params.reviewId, { status: "reported" });
        res.json({ message: "Review reported successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error reporting review" });
    }
}