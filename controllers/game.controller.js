const axios = require('axios');
var mongoose = require('mongoose');
const Sesion = require('../models/game.model').Sesion;
const typeMap = require('./pokemon.controller').typeMap;

const getRandomPokemonByType = require('./pokemon.controller').getRandomPokemonByType;

async function jugar(req, res) {
    try {
      const { eleccion: choice, sesionUsuario } = req.body;
  
      const player1Pokemon = await getRandomPokemonByType(typeMap[choice]);
  
      const types = ["fire", "water", "grass"];
      const player2Type = types[Math.floor(Math.random() * types.length)];
      const player2Pokemon = await getRandomPokemonByType(typeMap[player2Type]);
  
      let resultado;
      if (choice === player2Type) {
        resultado = "Empate";
      } else if (
        (choice === "fire" && player2Type === "grass") ||
        (choice === "water" && player2Type === "fire") ||
        (choice === "grass" && player2Type === "water")
      ) {
        resultado = "Ganaste";
      } else {
        resultado = "Perdiste";
      }
  
      
  
      if (sesionUsuario) {
        sesionUsuario.historialUsuario.push(player1Pokemon.name);
        sesionUsuario.historialCPU.push(player2Pokemon.name);
        if (resultado === "Ganaste") {
          sesionUsuario.ganados += 1;
        } else if (resultado === "Perdiste") {
          sesionUsuario.perdidos += 1;
        }
      } else {
        sesionUsuario = new Sesion({
          username: username,
          historialUsuario: [player1Pokemon.name],
          historialCPU: [player2Pokemon.name],
          //equipoElegido: req.body.equipoElegido,
          ganados: resultado === "Ganaste" ? 1 : 0,
          perdidos: resultado === "Perdiste" ? 1 : 0,
        });
      }
      await sesionUsuario.save();
  
      res.json({
        player1Pokemon: player1Pokemon,
        type: choice,
        player2Pokemon: player2Pokemon,
        type2: player2Type,
        resultado: resultado,
        historial: {
          usuario: sesionUsuario.historialUsuario,
          cpu: sesionUsuario.historialCPU
        },
        sesionUsuario: {
          ganados: sesionUsuario.ganados,
          perdidos: sesionUsuario.perdidos
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error durante la partida' });
    }
}


async function validarSesion(req, res, next) {

    const { username } = req.body;
    
    let sesionUsuario = await Sesion.findOne({ username });
    if (sesionUsuario) {
      req.body.sesionUsuario = sesionUsuario;
      next();
    } else {
      res.status(400).json({ error: 'Usuario no encontrado' });
    }


}

async function regresarPartida(req, res) {
    try {
      const username = req.query.username;
      let sesionUsuario = await Sesion.findOne({ username });
      if (!sesionUsuario) {
        sesionUsuario = new Sesion({ username });
        await sesionUsuario.save();
      }
      res.status(200).json({
        infoPartida: sesionUsuario
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Error al regresar partida"
      });
    }
}

module.exports = {
    jugar,
    validarSesion,
    regresarPartida
};