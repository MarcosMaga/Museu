const home = require('../controllers/home');
const tarsila = require('../controllers/tarsila');
const portinari = require('../controllers/portinari');
const error = require('../controllers/error');
const create = require('../controllers/create');
const update = require('../controllers/update');
const work = require('../controllers/work');
const signup = require('../controllers/signup');
const signin = require('../controllers/signin');

const {check, validationResult} = require('express-validator');

module.exports = {
    home: (app) => {
        app.get('/', (req, res) =>{
            home(req, res);
        })
    },
    work: (app) => {
        app.get('/work/:id', (req, res) => {
            work(req, res);
        })
    },
    tarsila: (app) => {
        app.get('/tarsila', (req, res) => {
            tarsila(req, res);
        })
    },
    portinari: (app) => {
        app.get('/portinari', (req, res) => {
            portinari(req, res);
        })
    },
    create: (app) => {
        app.get('/create', (req, res) => {
            create.create(req, res);
        });
        app.post('/create/core', [
            check('nome').isLength({min: 1, max: 100}).withMessage('Nome deve ter no minimo 5 caracteres'),
            check('ano').toInt().isInt({min: 0, max: 2100}).withMessage('Ano deve ser numérico inteiro e ir de 0 a 2100'),
            check('artista').isLength({min: 1, max: 100}).withMessage('Artista deve ter no mínimo 5 caracteres'),
            check('urlimagem').isURL().withMessage('A URL deve conter no mínimo 10 caracteres e no máximo 2000'),
            check('descricao').isLength({min: 1, max: 250}).withMessage('Descrição nula ou maior 250')
        ], (req, res) => {
            const errors = validationResult(req);
            create.core(req, res, errors);
        });
    },
    update: (app) => {
        app.get('/update/:id', (req, res) => {
            update.update(req, res);
        })
        app.post('/update/core/:id', [
            check('nome').isLength({min: 1, max: 100}).withMessage('Nome deve ter no minimo 5 caracteres'),
            check('ano').toInt().isInt({min: 0, max: 2100}).withMessage('Ano deve ser numérico inteiro e ir de 0 a 2100'),
            check('artista').isLength({min: 1, max: 100}).withMessage('Artista deve ter no mínimo 5 caracteres'),
            check('urlimagem').isURL().withMessage('A URL deve conter no mínimo 10 caracteres e no máximo 2000'),
            check('descricao').isLength({min: 1, max: 250}).withMessage('Descrição nula ou maior 250')
        ], (req, res) => {
            const errors = validationResult(req);
            update.core(req, res, errors);
        });
    },
    singup: (app) => {
        app.get('/signup', (req, res) => {
            signup.create(req, res);
        })
        app.post('/signup', [
            check('email').isEmail().withMessage('Email inválido.'),
            check('senha').isLength({min: 6, max: 20}).withMessage('Senha inválida'),
            check('senhaC').custom((value, { req }) => {
                if (value !== req.body.senha) {
                    throw new Error('As senhas não coincidem');
                }
                return true;
            })
        ], (req, res) => {
            const errors = validationResult(req);
            signup.core(req, res, errors);
        })
    },
    singin: (app) => {
        app.get('/signin', (req, res) => {
            signin.create(req, res);
        })
        app.post('/signin', (req, res) => {
            signin.core(req, res);
        })
    },
    error: (app) =>{
        app.get('*', (req, res) => {
            error(req, res);
        })
    }
}