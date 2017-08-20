const facebook = {
  clientID: process.env.FACEBOOKAPPID,
  clientSecret: process.env.FACEBOOKAPPSECRET,
  callbackURL: process.env.FBCALLBACK,
  profileFields: ["id", "name", "displayName", "picture", "email"]
};

const google = {
  clientID: process.env.GOOGLEAPPID,
  clientSecret: process.env.GOOGLEAPPSECRET,
  callbackURL: process.env.GOOGLECALLBACK
};

const linkedin = {
  clientID: process.env.LINKEDINAPPID,
  clientSecret: process.env.LINKEDINAPPSECRET,
  callbackURL: process.env.LINKEDINCALLBACK,
  scope: ["r_basicprofile"]
};

const refreshUrl = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process
  .env.FACEBOOKAPPID}&client_secret=${process.env.FACEBOOKAPPSECRET}&`;

const googleRefresh = `https://www.googleapis.com/oauth2/v4/token?`;

module.exports.facebook = facebook;
module.exports.google = google;
module.exports.linkedin = linkedin;
module.exports.refreshFb = refreshUrl;
module.exports.refreshGoog = googleRefresh;
