const dbConnection = require('../../config/dbConnection');

const getPaintings = (callback) => {
    console.log('GET PAINTINGS MODEL HOME');
    dbConnection.query('SELECT * FROM obrasdearte;', callback);
}

const getPaintingsByArtist = (artist, callback) => {
    dbConnection.query(`SELECT * FROM obradearte WHERE artista = "${artist}";`, callback);
}

const getPaintingById = (id, callback) => {
    dbConnection.query(`SELECT * FROM obrasdearte WHERE idobra = "${id}";`, callback);
}

const insertPainting = (painting, callback) => {
    dbConnection.query(`INSERT INTO obrasdearte VALUES (DEFAULT, '${painting.nome}', '${painting.artista}', ${painting.ano}, '${painting.urlimagem}', NOW(), '${painting.descricao}');`, callback);
}

const updatePaiting = (id, painting, callback) => {
    dbConnection.query(`UPDATE obrasdearte SET nome='${painting.nome}', artista='${painting.artista}', ano=${painting.ano}, urlimagem='${painting.urlimagem}', descricao='${painting.descricao}' WHERE idobra=${id}`, callback);
}

module.exports = {getPaintings, getPaintingsByArtist, insertPainting, getPaintingById, updatePaiting};