const mongoose = require('mongoose');
const CouponTextSchema = mongoose.Schema({
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
    text: {
        type: String,
        require: true,
    },
    couponData: {
        type: Object,
        require: true,
    }
});

const CouponsTextModel = mongoose.model('text', CouponTextSchema);

module.exports = CouponsTextModel;
