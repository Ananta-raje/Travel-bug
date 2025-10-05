const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLogdin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router
.route("/")
.get( wrapAsync(listingController.index))
.post( isLogdin, upload.single("listing[image]"), 
 validateListing,
 wrapAsync(listingController.createListing)
);

//New Route
router.get("/new", isLogdin,listingController.renderNewform );

router
.route("/:id")
.get( wrapAsync(listingController.showlistings))
.put(isLogdin, isOwner,  upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete( isLogdin,isOwner, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLogdin,isOwner, wrapAsync(listingController.renderEditform));


module.exports = router;
