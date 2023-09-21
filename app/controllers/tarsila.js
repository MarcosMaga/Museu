const paintingsModel = require('../models/paintings');
const logger = require('../../config/logger');

const tarsila = (req, res) => {
    paintingsModel.getPaintingsByArtist('Tarsila do Amaral', (error, result) => {
        console.log(error);
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }
        console.log(result);
        res.render('tarsila.ejs', {paintings: result});
    })
}

module.exports = tarsila;