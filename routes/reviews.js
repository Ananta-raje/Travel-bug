const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLogdin,validateReview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");





// Reviews
// post route

router.post ("/",isLogdin, validateReview, wrapAsync(reviewController.createReview));

//Delete reviews route
router.delete("/:reviewId", isLogdin, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;