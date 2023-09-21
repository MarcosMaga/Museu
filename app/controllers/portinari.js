const paintingsModel = require('../models/paintings');
const logger = require('../../config/logger');

const portinari = (req, res) => {
    paintingsModel.getPaintingsByArtist("Cândido Portinari", (error, result) => {
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }
        console.log(result);    
        res.render('portinari.ejs', {paintings: result});
    })
}

module.exports = portinari;