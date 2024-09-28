// src/components/Categories.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const Categories = ({ token , setCategoryId}) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editCategory, setEditCategory] = useState(null); // Category to edit
  const [newCategoryName, setNewCategoryName] = useState(''); // New name for the category
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setCategoryId(categoryId); 
    navigate(`/categories/${categoryId}/services`);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data);
    } catch (error) {
      setErrorMessage('Error fetching categories.');
    }
  };

  const addCategory = async () => {
    try {
      await axios.post(
        'http://localhost:8800/api/category',
        { name: newCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      setErrorMessage('Error adding category.');
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:8800/api/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove the deleted category from the state
      setCategories(categories.filter(category => category.id !== categoryId));

      console.log(response.data.message); // Log the success message from the backend
    } catch (error) {
      console.error('Error deleting category:', error.response.data.message || error.message);
      alert('Error deleting category: ' + (error.response?.data?.message || error.message));
    }
  };


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8800/api/category/${editCategory.id}`, 
        { name: newCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the local state after the successful update
      setCategories(categories.map(cat =>
        cat.id === editCategory.id ? { ...cat, name: newCategoryName } : cat
      ));
      
      // Close modal and clear state
      setEditCategory(null);
      setNewCategoryName('');
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating category:', error.response?.data?.message || error.message);
      alert('Error updating category: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container">
    <h2>Categories</h2>
   
    {errorMessage && <p className="text-danger">{errorMessage}</p>}

<div className="form-group mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="New Category"
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
  />
  <button className="btn btn-success mt-2" onClick={addCategory}>
    Add Category
  </button>
</div>



    <ul className="list-group">
      {categories.map((category) => (
        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
          {category.name}
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={() => {
                setEditCategory(category); // Set the category to be edited
                setNewCategoryName(category.name); // Pre-fill with existing name
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(category.id)}
            >
 
              Delete
            </button>

            <button className='btn btn-warning' onClick={() => handleCategorySelect(category.id)}>Select Category</button>
          </div>
        </li>
      ))}
    </ul>

    {/* Modal for updating category */}
    {editCategory && (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Category</h5>
              <button
                type="button"
                className="close"
                onClick={() => setEditCategory(null)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditCategory(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Categories;
