// src/components/Services.js

import React, { useEffect, useState } from 'react';
import { getServices, createService, updateService, deleteService } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import ServiceForm from './ServiceForm';

const Services = ({ categoryId }) => {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices(categoryId, token);
      setServices(data);
    };
    fetchServices();
  }, [categoryId, token]);

  const handleDelete = async (serviceId) => {
    await deleteService(categoryId, serviceId, token);
    setServices(services.filter((svc) => svc.id !== serviceId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <ServiceForm
        editingService={editingService}
        setEditingService={setEditingService}
        setServices={setServices}
        categoryId={categoryId}
      />
      <ul>
        {services.map((service) => (
          <li key={service.id} className="flex justify-between items-center border-b py-2">
            <span>{service.name}</span>
            <div>
              <button
                className="text-blue-600 hover:underline mr-2"
                onClick={() => setEditingService(service)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
