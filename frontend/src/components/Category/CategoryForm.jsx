import React, { useState } from 'react';

const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Category</button>
    </form>
  );
};

export default CategoryForm;
