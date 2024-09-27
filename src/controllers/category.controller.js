import pool from '../model/db.js';

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};
//
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  try {
    const [result] = await pool.query('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};

export const deleteEmptyCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const [services] = await pool.query('SELECT * FROM services WHERE category_id = ?', [categoryId]);
    if (services.length > 0) return res.status(400).json({ message: 'Category is not empty' });

    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [categoryId]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database error' });
  }
};
