import React from 'react';

const CategoryList = ({ categories, onDelete }) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id} className="flex justify-between items-center mb-2">
          <span>{category.name}</span>
          <button onClick={() => onDelete(category.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
