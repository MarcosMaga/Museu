const paintingsModel = require('../models/paintings');
const logger = require('../../config/logger');

const create = (req, res) => {
    res.render('insertPainting.ejs', ({erros: null, data:null, titulo:"Formulário para inclusão de obra de arte"}));
}

const core = (req, res, errors) => {
    let data = req.body;
    console.log(errors);
    if(!errors.isEmpty())
        res.render('insertPainting.ejs', {erros: errors.array(), data: data, titulo:"Formulário para inclusão de obra de arte"});
    else{
        paintingsModel.insertPainting(data, (error, result) => {
            if(error){
                logger.log({
                    level: 'error',
                    message: error.sqlMessage
                });
                
                res.render('error.ejs', {error: error.sqlMessage, status: 500});
            }
            console.log(result);
            res.redirect('/');
        })
    }

}

module.exports = {create, core};