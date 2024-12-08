const Barang = require('../models/barang');

exports.getAllBarang = async (req, res) => {
  try {
    const barangs = await Barang.findAll();
    res.json(barangs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const barang = await Barang.create(req.body);
    res.status(201).json(barang);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id);
    if (!barang) return res.status(404).json({ message: 'Barang not found' });
    res.json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const [updated] = await Barang.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBarang = await Barang.findByPk(req.params.id);
      return res.json(updatedBarang);
    }
    throw new Error('Barang not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const deleted = await Barang.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(204).json({ message: 'Barang deleted' });
    }
    throw new Error('Barang not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

