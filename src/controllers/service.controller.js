import pool from '../model/db.js';

export const createService = async (req, res) => {
  const { name, type } = req.body;
  const { categoryId } = req.params;

  if (!name || !type) return res.status(400).json({ message: 'Service name and type are required' });

  try {
    const [result] = await pool.query('INSERT INTO services (category_id, name, type) VALUES (?, ?, ?)', [categoryId, name, type]);
    res.status(201).json({ id: result.insertId, name, type });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

export const getServicesInCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const [services] = await pool.query('SELECT * FROM services WHERE category_id = ?', [categoryId]);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

export const updateService = async (req, res) => {
  const { name, type } = req.body;
  const { serviceId } = req.params;

  try {
    const [result] = await pool.query('UPDATE services SET name = ?, type = ? WHERE id = ?', [name, type, serviceId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

export const deleteService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM services WHERE id = ?', [serviceId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};
