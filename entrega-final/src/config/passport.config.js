import passport from "passport";
import local from "passport-local";
import userService from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import dotenv from "dotenv";
import GitHubStrategy from "passport-github2";

dotenv.config();

const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use("register", new localStrategy(
    {passReqToCallback: true, usernameField: "email"}, async(req,username, password,done) => {
        const {first_name, last_name, email, age } = req.body;
        try {
            let user = await userService.findOne({email:username})
                if (user) {
                    return done(null, false)
                }

                let role = "user";
                
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    role = 'admin';
                }

                const newUser = new userService( {
                    first_name,
                    last_name, 
                    email, 
                    age,
                    password: createHash(password),
                    role: role
                })
                await newUser.save();
                return done(null, newUser)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.use("login", new localStrategy({usernameField:"email"}, async(username, password, done) => {
    try {
        const user = await userService.findOne({ email: username });
        if (!user) {
            console.log("El usuario no existe");
            return done(null, user)
        }
        if (!isValidPassword(user, password)) return done(null, false);

            if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                user.role = 'admin';
                await user.save();
            }
            return done(null, user)
        } catch (error) {
            return done (error)
        }
    })
    )

    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET, 
        callbackURL: process.env.GITHUB_CALLBACK_URL

    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.email || "email@example.com";
      
            let user = await userService.findOne({ email });
      
            if (!user) {
              let newUser = {
                first_name: profile._json.name || "Unknown",
                last_name: "",
                age: "",
                email,
                password: "",
                role: "user"
              };
              let result = await userService.create(newUser);
              done(null, result);
            } else {
              done(null, user);
            }
          } catch (error) {
            return done(error);
          }
        }
      ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id)

        done(null, user)
    })
}

export default initializePassport;