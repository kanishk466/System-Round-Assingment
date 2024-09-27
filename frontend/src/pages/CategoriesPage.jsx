import React, { useEffect, useState } from 'react';
import { getCategories, createCategory } from '../utils/api';
import CategoryForm from '../components/Category/CategoryForm';
import CategoryList from '../components/Category/CategoryList';

const CategoriesPage = ({ token }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories(token);
      setCategories(response.data);
    };
    fetchCategories();
  }, [token]);

  const handleCreateCategory = async (category) => {
    const response = await createCategory(category, token);
    setCategories([...categories, response.data]);
  };

  const handleDeleteCategory = (id) => {
    // Implement deletion logic here
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Categories</h1>
      <CategoryForm onSubmit={handleCreateCategory} />
      <CategoryList categories={categories} onDelete={handleDeleteCategory} />
    </div>
  );
};

export default CategoriesPage;
