// src/components/ServiceForm.js

import React, { useEffect, useState } from 'react';
import { createService, updateService } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ServiceForm = ({ editingService, setEditingService, setServices, categoryId }) => {
  const { token } = useAuth();
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
    } else {
      setName('');
    }
  }, [editingService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingService) {
      const updatedService = await updateService(categoryId, editingService.id, { name }, token);
      setServices((prev) =>
        prev.map((svc) => (svc.id === updatedService.id ? updatedService : svc))
      );
      setEditingService(null);
    } else {
      const newService = await createService(categoryId, { name }, token);
      setServices((prev) => [...prev, newService]);
    }

    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Service Name"
        required
        className="border border-gray-300 rounded p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        {editingService ? 'Update Service' : 'Add Service'}
      </button>
      {editingService && (
        <button
          type="button"
          className="text-red-600 ml-2"
          onClick={() => setEditingService(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ServiceForm;
