const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const users = require('../models/kisan')
const google_users = require('../models/google_user')

const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    
    callbackURL:"http://localhost:3000/auth/google/callback"
},
    async function(accessToken,refreshToken,profile,cb){
        try{
            let user = await google_users.findOne({googleId:profile.id})
            if(!user){
                user = await google_users.create({
                    googleId:profile.id,
                    username:profile.displayName,
                    googleAccessToken:accessToken,
                    googleImg:profile.photos[0].value

                })
            }
            return cb(null,user)

        }
        catch(err){
            return cb(err)
        }
    }))

passport.use(new LocalStrategy(
    async function(username,password,done){
        try{
            let user = await users.findOne({username})
            console.log(user)
            if(!user) return done(null,false);
            bcrypt.compare(password,user.password,function(err,result){
                if(err) return done(err);
                else if (result ==false) return done(null,false);
                return done(null,user)


            })


        }
        catch(err){
            if(err){return done(err)}
        }
    }

))

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    try{
    let user = await users.findOne({_id:id})
    if(!user) return done(null,false);
    done(null,user)
    
}
    catch(err){
        done(err,false)

    }
})

module.exports = passport
