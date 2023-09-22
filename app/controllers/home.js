const paintingsModel = require('../models/paintings');
const logger = require('../../config/logger');

const home = (req, res) => {
    paintingsModel.getPaintings((error, result) => {
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }
        
        console.log(result);
        res.render('menu.ejs', {paintings: result, user: req.session.user});
    });
}

module.exports = home;