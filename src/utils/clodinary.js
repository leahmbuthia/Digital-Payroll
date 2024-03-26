const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmfjxrfmc',
    api_key: '364661871224382',
    api_secret: '0FNmJttkvxq1dB5U_3ciAVDqWo0'
});

module.exports = cloudinary;