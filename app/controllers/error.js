const error = (req, res) => {
    res.status(404);
    res.render('error.ejs', {error: 'Página não encontrada :/', status: 404});
}

module.exports = error;