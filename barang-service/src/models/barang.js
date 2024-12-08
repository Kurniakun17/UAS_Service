// src/models/barang.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Barang = sequelize.define('Barang', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  harga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Barang;
