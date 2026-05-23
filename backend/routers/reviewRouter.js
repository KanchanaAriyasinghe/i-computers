import express from "express";
import {
    createReview,
    getProductReviews,
    getAllReviews,
    updateReviewStatus,
    deleteReview,
    markHelpful,
    reportReview
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

// User routes
reviewRouter.post("/", createReview)
reviewRouter.get("/product/:productId", getProductReviews)
reviewRouter.put("/:reviewId/helpful", markHelpful)
reviewRouter.put("/:reviewId/report", reportReview)

// Admin routes
reviewRouter.get("/all/:pageSize/:currentPage", getAllReviews)
reviewRouter.put("/:reviewId/status", updateReviewStatus)
reviewRouter.delete("/:reviewId", deleteReview)

export default reviewRouter;