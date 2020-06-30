require('dotenv').config();

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || keys.googleClientID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.googleClientSecret,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Access Token: ', accessToken);
      console.log('Refresh Token: ', refreshToken);
      console.log('Profile: ', profile);
    }
  )
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} environment, on port ${PORT}`);
});
