const koa = require("koa");
const router = require("koa-router");
const cors = require("koa2-cors");
const helmet = require("koa-helmet");
const https = require("https");
const passport = require("koa-passport");
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");
const user = require("./models/user");
const config = require("./config");
const mongoose = require("mongoose");
const apis = require("./app");
const Router = new router();
const app = new koa();

mongoose.connect(process.env.DBURI);
mongoose.connection.on("connected", () => {
  console.log("Database connected");
  app.listen(process.env.PORT, () =>
    console.log(`listening ${process.env.PORT}`)
  );
});
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});
mongoose.connection.on("error", err => {
  console.log(`Database error on connection: ${err}`);
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Database disconnected due the end of application");
    process.exit(0);
  });
});

app.use((ctx, next) =>
  next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  })
);

async function transformFb(profile, token) {
  try {
    const data = await user.findOne({ uniqueID: `facebook:${profile.id}` });
    if (data) {
      const TOKEN = jwt.sign(
        {
          uniqueID: data.uniqueID,
          provider: data.provider
        },
        process.env.JWTSECRET,
        { expiresIn: "60d" }
      );
      return { token: TOKEN, status: "signin" };
    } else {
      https.get(`${config.refreshFb}fb_exchange_token=${token}`, res => {
        let body;
        res.on("data", chunk => (body += chunk));
        res.on("end", async () => {
          let obj = {
            uniqueID: `facebook:${profile.id}`,
            accessToken: JSON.parse(body.replace("undefined", "")).access_token,
            provider: "facebook",
            firstName: profile.first_name,
            lastName: profile.last_name,
            dp: profile.picture.data.url
          };
          let newuser = new user(obj);
          await newuser.save();
          const TOKEN = jwt.sign(
            {
              uniqueID: `facebook:${profile.id}`,
              provider: "facebook"
            },
            process.env.JWTSECRET,
            { expiresIn: "60d" }
          );
          return { token: TOKEN, status: "signup" };
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function transformGoog(profile, token, refresh) {
  try {
    const data = await user.findOne({ uniqueID: `google:${profile.id}` });
    if (data) {
      const TOKEN = jwt.sign(
        {
          uniqueID: data.uniqueID,
          provider: data.provider
        },
        process.env.JWTSECRET,
        { expiresIn: "5s" }
      );
      return { token: TOKEN, status: "signin" };
    } else {
      let obj = {
        uniqueID: `google:${profile.id}`,
        accessToken: token,
        refreshToken: refresh,
        provider: "google",
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        dp: profile.image.url
      };
      let newuser = new user(obj);
      await newuser.save();
      const TOKEN = jwt.sign(
        {
          uniqueID: `google:${profile.id}`,
          provider: "google"
        },
        process.env.JWTSECRET,
        { expiresIn: "60d" }
      );
      return { token: TOKEN, status: "signup" };
    }
  } catch (e) {
    console.error(e);
  }
}

async function transformLn(profile, token) {
  try {
    const data = await user.findOne({ uniqueID: `linkedin:${profile.id}` });
    if (data) {
      const TOKEN = jwt.sign(
        {
          uniqueID: data.uniqueID,
          provider: data.provider
        },
        process.env.JWTSECRET,
        { expiresIn: "60d" }
      );
      return { token: TOKEN, status: "signin" };
    } else {
      let obj = profile.pictureUrl
        ? {
            uniqueID: `linkedin:${profile.id}`,
            accessToken: token,
            provider: "linkedin",
            firstName: profile.firstName,
            lastName: profile.lastName,
            website: profile.publicProfileUrl,
            dp: `http://api.linkedin.com/v1/people/~:(${profile.pictureUrl})`
          }
        : {
            uniqueID: `linkedin:${profile.id}`,
            accessToken: token,
            provider: "linkedin",
            firstName: profile.firstName,
            lastName: profile.lastName,
            website: profile.publicProfileUrl
          };
      let newuser = new user(obj);
      await newuser.save();
      const TOKEN = jwt.sign(
        {
          uniqueID: `linkedin:${profile.id}`,
          provider: "linkedin"
        },
        process.env.JWTSECRET,
        { expiresIn: "60d" }
      );
      return { token: TOKEN, status: "signup" };
    }
  } catch (e) {
    console.error(e);
  }
}

passport.use(
  new FacebookStrategy(
    config.facebook,
    async (accessToken, refreshToken, profile, done) => {
      done(null, transformFb(profile._json, accessToken));
    }
  )
);

passport.use(
  new GoogleStrategy(
    config.google,
    async (accessToken, refreshToken, profile, done) => {
      done(null, transformGoog(profile._json, accessToken, refreshToken));
    }
  )
);

passport.use(
  new LinkedInStrategy(
    config.linkedin,
    async (accessToken, refreshToken, profile, done) => {
      done(null, transformLn(profile._json, accessToken));
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

Router.get("/", ctx => (ctx.body = "TutorPug"));

Router.get("/auth/facebook", passport.authenticate("facebook"));

Router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
  async ctx =>
    ctx.redirect(
      `${process.env.SECRET}?user=${encodeURIComponent(
        JSON.stringify(await ctx.req.user)
      )}`
    )
);

Router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
    accessType: "offline",
    prompt: "consent"
  })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  async ctx =>
    ctx.redirect(
      `${process.env.SECRET}?user=${encodeURIComponent(
        JSON.stringify(await ctx.req.user)
      )}`
    )
);

Router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: process.env.LINKEDINSTATE })
);

Router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/auth/linkedin" }),
  async ctx =>
    ctx.redirect(
      `${process.env.SECRET}?user=${encodeURIComponent(
        JSON.stringify(await ctx.req.user)
      )}`
    )
);

app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.hidePoweredBy({ setTo: "ASP.NET" }));
app.use(cors());
app.use(Router.routes());

app.use(koaJwt({ secret: process.env.JWTSECRET }));
app.use(apis.routes());
