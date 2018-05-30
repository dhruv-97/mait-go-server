module.exports = {
    'secretKey': process.env.SECRET,
    'mongoUrl' : 'mongodb://localhost:27017/mait',
    'facebook': {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}