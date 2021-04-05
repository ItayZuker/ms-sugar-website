const express = require('express')
const router = express.Router()
const Shopify = require('shopify-api-node')
const cc = require('coupon-code')
const CouponsPictureModel = require('../models/couponPicture.model.js')
const CouponsTextModel = require('../models/couponText.model.js')
const cloudinary = require('cloudinary').v2
const { ObjectId } = require('bson')
const https = require('https');
const fetch = require("node-fetch");
require('dotenv').config()

cloudinary.config({ 
    cloud_name: process.env.REACT_APP_STORE_FRONT_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.REACT_APP_STORE_FRONT_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_STORE_FRONT_CLOUDINARY_API_SEVRET
})

const shopify = new Shopify({
    shopName: 'ms-sugar-skate',
    apiKey: process.env.REACT_APP_STORE_FRONT_API_kEY,
    password: process.env.REACT_APP_STORE_FRONT_PASSWORD
})

router.get('/change-checkout-currency/:new_currency', async ( req, res ) => {
    const apiKey = process.env.REACT_APP_STORE_FRONT_API_kEY
    const password = process.env.REACT_APP_STORE_FRONT_PASSWORD
    const shopName = 'ms-sugar-skate.myshopify.com'
    const token = process.env.REACT_APP_STORE_FRONT_ACCESS_TOKEN
    try {
        const test = await fetch(`https://${apiKey}:${password}@${shopName}/admin/api/2021-01/checkouts/${token}.json`)
        const a = await test.json()
        console.log(a)

    } catch ( err ) {
        console.log( err )
    }
})

router.get('/get-currency', async ( req, res ) => {
    const apiKey = process.env.REACT_APP_STORE_FRONT_API_kEY
    const password = process.env.REACT_APP_STORE_FRONT_PASSWORD
    const shopName = 'ms-sugar-skate.myshopify.com'
    const currencies = { current: '', list: [] }
    try {
        const shopData = await fetch(`https://${apiKey}:${password}@${shopName}/admin/api/2021-01/shop.json`)
        const shop = await shopData.json()
        currencies.current = shop.shop.currency
        const currenciesData = await fetch(`https://${apiKey}:${password}@${shopName}/admin/api/2021-01/currencies.json`)
        const currenciesOptions = await currenciesData.json()
        await currenciesOptions.currencies.forEach( item => {
            currencies.list.push( item.currency )
        })
        res.status( 200 ).json( currencies )
    } catch ( err ) {
        console.log( err )
    }
})

const validatePictureFileSize = ( file ) => {
    return new Promise(( resolve, reject ) => {
        if( file.size >= 5000000 ) {
            reject( 'Max size 5MB' )
        } else {
            resolve( true )
        }
    })
}

router.post('/get-discount-coupon-text', async( req, res ) => {
        const priceRuleId = process.env.REACT_APP_STORE_FRONT_PRICE_RULE_ID
        const code = await cc.generate({ partLen : 6 });
        const couponData =  await shopify.discountCode.create( priceRuleId, { code: code } )
    try {
        await CouponsTextModel
          .create({
              name: req.body.name,
              email: req.body.email,
              anonymous: req.body.anonymous,
              termsBody: req.body.termsBody,
              agreeTerms: req.body.agreeTerms,
              text: req.body.text,
              couponData: couponData,
          }, ( err, docs ) => {
              if( err ) {
                  res.status( 500 ).send( err )
              } else {
                res.status( 200 ).json( { couponCode: couponData.code, userId: docs._id } )
              }
          })
        } catch ( err ) {
            res.status( 500 ).send( err )
        }
})

router.delete('/delete-text', async( req, res ) => {
    console.log(req.body.userId)
    try {
        await CouponsTextModel.deleteOne( { _id: req.body.userId } )
        res.status( 200 ).json( 'User & Text Data Deleted' )
    } catch ( err ) {
        res.status( 500 ).send( err )
    }
})

router.post('/get-discount-coupon-picture', async( req, res ) => {
    console.log(req.body)
    try {
        await validatePictureFileSize( req.body.fileSize )
        const priceRuleId = process.env.REACT_APP_STORE_FRONT_PRICE_RULE_ID
        const code = await cc.generate({ partLen : 6 });
        const couponData =  await shopify.discountCode.create( priceRuleId, { code: code } )
        await CouponsPictureModel
          .create({
              name: req.body.name,
              email: req.body.email,
              anonymous: req.body.anonymous,
              termsBody: req.body.termsBody,
              agreeTerms: req.body.agreeTerms,
              aboutTheArt: req.body.aboutTheArt,
              cloudinaryData: req.body.cloudinaryData,
              couponData: couponData,
          }, ( err, docs ) => {
              if( err ) {
                  res.status( 500 ).send( err )
              } else {
                res.status( 200 ).json( { couponCode: couponData.code, userId: docs._id } )
              }
          })
        } catch ( err ) {
            res.status( 500 ).send( err )
        }
})

router.delete('/delete-picture', async( req, res ) => {
    console.log(req.body.userId)
    try {
        await cloudinary.uploader.destroy( req.body.cloudinaryData.public_id )
        await CouponsPictureModel.deleteOne( { _id: req.body.userId } )
        res.status( 200 ).json( 'User & File Data Deleted' )
    } catch ( err ) {
        res.status( 500 ).send( err )
    }
})

module.exports = router