const router = require('express').Router()
const User = require ('../models/User')
const passport = require('../config/passport')


router.get('/signup', (req,res,next) =>{
  const config = {
    title: 'Registrate',
    action: '/signup',
    button: 'Sign up',
    register: true
  }
  res.render('auth/form', config)
})

router.post('/signup', async (req,res,next) =>{
  try{ 
    const user = await User.register({...req.body}, req.body.password)
    console.log(user)
    res.redirect('/login')
    console.log(user)

  } catch(errors){
    console.log(errors)
    res.send('Tu usuario ya esta en uso')

  }
})

router.get('/login',(req,res,next)=>{
  const config = {
    title: 'Inicia Sesión',
    action: '/login',
    button: 'Login'
  }
  res.render('auth/form', config)
})

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  console.log(req.userName, req.session)
  res.redirect('/profile')
})

router.get('/profile', checkAuthentication, (req,res,next)=>{
  res.render('auth/profile',{user: req.userName})
})

router.get('/logout', (req,res,next) =>{
  req.logout()
  res.redirect('/login')
})

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect('/login');
  }
}

module.exports = router