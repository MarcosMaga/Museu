const paintingModel = require('../models/paintings');
const logger = require('../../config/logger');

const update = (req, res) => {
    const {id} = req.params;
    paintingModel.getPaintingById(id, (error, result) => {
        if(error){
            logger.log({
                level: 'error',
                message: error.sqlMessage
            });
            
            res.render('error.ejs', {error: error.sqlMessage, status: 500});
        }else{
            res.render('insertPainting.ejs', ({erros: null, data: result[0], titulo: "Formulário para atualização de obra de arte"}))
        }
    })
}

const core = (req, res, errors) => {
    const {id} = req.params;
    const data = req.body;

    if(!errors.isEmpty())
        res.render('insertPainting.ejs', {erros: errors.array(), data: data, titulo:"Formulário para atualização de obra de arte"});
    else{
        paintingModel.updatePaiting(id, data, (error, result) => {
            if(error){
                logger.log({
                    level: 'error',
                    message: error.sqlMessage
                });
                
                res.render('error.ejs', {error: error.sqlMessage, status: 500});
            }             
            else{
                res.redirect('/');
            }
        })
    }
}

module.exports = {update, core};