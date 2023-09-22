const usersModel = require('../models/users');
const logger = require('../../config/logger');

const signin = (req, res) => {
    res.render('signin.ejs', ({erro: null, data: null}));
}

const login = (req, res, errors) => {
    const user = req.body;
    usersModel.getUser(user, (error, result) => {
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            console.log(error);
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }
        else{
            if(result.length > 0){
                req.session.user = {
                    id: result[0].userid,
                    email: result[0].email
                };
                res.redirect('/');
            }
            else{
                res.render('signin.ejs', ({erro: 'Falha na autenticação', data: req.body}));
            }
        }
    });
}

const signup = (req, res) => {
    res.render('signup.ejs', ({erros: null, data: null}));
}

const register = (req, res, errors) => {
    let data = req.body;
    if(!errors.isEmpty())
        res.render('signup.ejs', {erros: errors.array(), data: data});
    else{
        usersModel.insertUser(data, (error, result) => {
            if(error){
                logger.log({
                    level: 'error',
                    message: error.sqlMessage
                });

                res.render('error.ejs', {error: error.sqlMessage, status: 500});
            }
            res.redirect('/signin');
        })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.redirect('/');
    });
}

module.exports = {signin, login, signup, register, logout};