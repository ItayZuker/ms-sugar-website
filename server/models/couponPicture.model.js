const mongoose = require('mongoose');
const CouponPictureSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    anonymous: {
        type: Boolean,
        require: true,
    },
    termsBody: {
        type: String,
        require: true,
    },
    agreeTerms: {
        type: Boolean,
        require: true,
    },
    aboutTheArt: {
        type: String,
        require: false,
    },
    cloudinaryData: {
        type: Object,
        require: true,
    },
    couponData: {
        type: Object,
        require: true,
    }
});

const CouponsPictureModel = mongoose.model('picture', CouponPictureSchema);

module.exports = CouponsPictureModel;
