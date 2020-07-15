module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 
    'mongodb+srv://newuser:newuser@teste.yjuag.mongodb.net/teste?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1',
    GEOCODER_PROVIDER : process.env.GEOCODER_PROVIDER || 'google',
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY || 'AIzaSyB8igJ8pfBHm0_Uqq1hjfWJuPyO59NGXcU',


    GOOGLE_CLIENT_ID: "512571691141-8q8j9n4l95vj7j5k033ijdjvlb4ui2rp.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "kb6s7v1C76wnYZ3042iXK525",
};