
const sequelize = require('../config/database');
const User = require('../models/user');
const Barang = require('../models/barang');

const seedData = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  await User.bulkCreate([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123'
    },
    {
      username: 'user',
      email: 'user@example.com', 
      password: 'password456'
    }
  ]);

  // Seed Barang
  await Barang.bulkCreate([
    { nama: 'Laptop', harga: 10000000, stok: 10 },
    { nama: 'Smartphone', harga: 5000000, stok: 20 },
    { nama: 'Headphone', harga: 500000, stok: 50 }
  ]);

  console.log('Database seeded successfully');
};

seedData();

module.exports = seedData;
