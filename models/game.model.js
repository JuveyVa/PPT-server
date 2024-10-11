var mongoose = require('mongoose');
const pokemonSchema = require('./pokemon.model').pokemonSchema;



const sesionEsquema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    ganados: {
      type: Number,
      default: 0
    },
    perdidos: {
      type: Number,
      default: 0
    },
    historial: {
        type: [mongoose.Types.ObjectId],
        ref: 'Historial'
    },
    //historialUsuario: {
    //  type: Array,
    //  default: []
    //},
    //historialCPU: {
    //  type: Array,
    //  default: []
    //},
    equipoElegido: {
      type: pokemonSchema,
      required: false
    }
  });

  const Sesion = mongoose.model('Sesion', sesionEsquema);

  module.exports = {
    Sesion
};