const cloudinary = require('cloudinary')
cloudinary.config({
cloud_name: 'Unicorn',
api_key: '241213473932221',
api_secret: `${process.env.CLOUDINARY_API_SECRET}`
})
module.exports = cloudinary
