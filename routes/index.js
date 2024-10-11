var express = require('express');
var router = express.Router();
const axios = require('axios');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/poke', );

router.get('/', async function(req, res, next) {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener lista de Pokémon' });
  }
});

router.get('/region', async function(req, res, next) {
  try {
    const numeroRegion = {"kanto": 1, "johto": 2, "hoenn": 3, "sinnoh": 4, "unova": 5, "kalos": 6, "alola": 7, "galar": 8};
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Pokémon por región' });
  }
});





const jugar = require('../controllers/game.controller').jugar;

const regresarPartida = require('../controllers/game.controller').regresarPartida;

const validarSesion = require('../controllers/game.controller').validarSesion;





router.post('/game', validarSesion, jugar);

router.get('/regresarPartida', regresarPartida);

router.get('/historial', );

// Apartado de funciones
async function InfoPoke(req, res, next) {
  try {
    var nombre = req.query.name;
    const url = "https://pokeapi.co/api/v2/pokemon/" + nombre;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener información del Pokémon' });
  }
}







async function historial(req, res) {
  try {
    const username = req.query.username;
    let sesionUsuario = await Sesion.findOne
    ({ username });
    if (!sesionUsuario) {
      sesionUsuario = new Sesion({ username });
      await sesionUsuario.save();
    }
    res.status(200).json({
      historial: {
        usuario: sesionUsuario.historialUsuario,
        cpu: sesionUsuario.historialCPU,
        ganados: sesionUsuario.ganados,
        perdidos: sesionUsuario.perdidos
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener historial"
    });
  }
}



module.exports = router;
