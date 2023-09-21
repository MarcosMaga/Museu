const usersModel = require('../models/users');
const logger = require('../../config/logger');

const create = (req, res) => {
    res.render('signup.ejs', ({erros: null, data: null}));
}

const core = (req, res, errors) => {
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

module.exports = {create, core};