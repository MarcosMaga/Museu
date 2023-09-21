const usersModel = require('../models/users');
const logger = require('../../config/logger');

const create = (req, res) => {
    res.render('signin.ejs', ({erro: null, data: null}));
}

const core = (req, res, errors) => {
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

module.exports = {create, core};