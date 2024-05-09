const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const kisan = require('../models/kisan')


passport.use(new LocalStrategy(
    async function(username,password,done){
        try{
            let user = await kisan.findOne({username})
            if(!user) return done(null,false);
            bcrypt.compare(password,user.password,function(err,result){
                if(err) return done(err);
                else if (result ==false) return done(null,false);
                return done(null,user)


            })


        }
        catch(err){
            next(err)
        }
    }

))

passport.serializeUser(function(user,done){
    done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    try{
    let user = await kisan.findOne({_id:id})
    if(!user) return done(null,false);
    done(null,user)
    
}
    catch(err){
        done(err,false)

    }
})

module.exports = passport
