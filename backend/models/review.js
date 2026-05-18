import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            ref: "Product"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        userEmail: {
            type: String,
            required: true
        },
        userFirstName: {
            type: String,
            required: true
        },
        userLastName: {
            type: String,
            required: true
        },
        userImage: {
            type: String,
            default: "/images/default-profile.png"
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        title: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["published", "hidden", "reported"],
            default: "published"
        },
        helpfulCount: {
            type: Number,
            default: 0
        },
        helpfulVoters: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;