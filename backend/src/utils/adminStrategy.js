const localStrategy = require('passport-local').Strategy;
const userHelper = require('../helpers/user');
const bcrypt = require('bcrypt');

const localOptions = {
  usernameField: 'username',
  passwordField: 'password'
};

module.exports = new localStrategy(localOptions, async (username, password, done)=>{
  try{
    const user = await userHelper.getUserAdmin(username);
    console.log(user.password)
    if(user != null){
      const pass = await bcrypt.compare(password, user.password);
      if(pass != ''){
        return done(null, user)
      }else{
        return done(null, false, {message: 'Password Incorrect!'})
      }
    }else{
      return done(null, false), {message: 'Email not Found!'};
    }
  }catch(err){
    done(err);
    throw err;
  }
})