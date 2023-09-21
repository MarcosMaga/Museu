const paintingsModel = require('../models/paintings');
const logger = require('../../config/logger');

const work = (req, res) => {
    const {id} = req.params;
    paintingsModel.getPaintingById(id, (error, result) => {
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }else{
            res.render('work.ejs', {painting: result[0]});
        }

    })
}

module.exports = work;