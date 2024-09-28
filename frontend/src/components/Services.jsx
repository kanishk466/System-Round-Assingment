// src/components/Services.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = ({ token, categoryId }) => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', type: 'Normal', priceOptions: [] });
  const [editService, setEditService] = useState(null); 
  const [priceOption, setPriceOption] = useState({ duration: '', price: '', type: 'Hourly' }); 

  // Fetch all services in a category
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/category/${categoryId}/services`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [categoryId, token]);

  // Handle add service
  const handleAddService = async () => {
    try {
      const response = await axios.post(`http://localhost:8800/api/category/${categoryId}/service`, newService, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices([...services, response.data]);
      setNewService({ name: '', type: 'Normal', priceOptions: [] });
    } catch (error) {
      console.error('Error adding service:', error.response?.data?.message || error.message);
      alert('Error adding service: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle update service
  const handleUpdateService = async () => {
    try {
      const response = await axios.put(`http://localhost:8800/api/category/${categoryId}/service/${editService.id}`, 
        editService, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setServices(services.map(s => s.id === editService.id ? response.data : s));
      setEditService(null); // Close modal
    } catch (error) {
      console.error('Error updating service:', error.response?.data?.message || error.message);
      alert('Error updating service: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle delete service
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:8800/api/category/${categoryId}/service/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error.response?.data?.message || error.message);
      alert('Error deleting service: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle adding price option
  const handleAddPriceOption = () => {
    setNewService({
      ...newService,
      priceOptions: [...newService.priceOptions, priceOption]
    });
    setPriceOption({ duration: '', price: '', type: 'Hourly' });
  };

  return (
    <div className="container">
      <h2>Services</h2>

      {/* Form to add new service */}
      <div className="card">
        <div className="card-body">
          <h4>Add New Service</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Service Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <select
            className="form-control mb-2"
            value={newService.type}
            onChange={(e) => setNewService({ ...newService, type: e.target.value })}
          >
            <option value="Normal">Normal</option>
            <option value="VIP">VIP</option>
          </select>

          {/* Price Option Inputs */}
          <h5>Price Options</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Duration"
            value={priceOption.duration}
            onChange={(e) => setPriceOption({ ...priceOption, duration: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={priceOption.price}
            onChange={(e) => setPriceOption({ ...priceOption, price: e.target.value })}
          />
          <select
            className="form-control mb-2"
            value={priceOption.type}
            onChange={(e) => setPriceOption({ ...priceOption, type: e.target.value })}
          >
            <option value="Hourly">Hourly</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <button className="btn btn-info mb-2" onClick={handleAddPriceOption}>Add Price Option</button>

          <ul>
            {newService.priceOptions.map((option, idx) => (
              <li key={idx}>{`${option.duration} - ${option.price} (${option.type})`}</li>
            ))}
          </ul>

          <button className="btn btn-success" onClick={handleAddService}>Add Service</button>
        </div>
      </div>

      {/* List of services */}
      <ul className="list-group mt-4">
        {services.map((service) => (
          <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
            {service.name} - {service.type}
            <div>
              <button
                className="btn btn-primary mr-2"
                onClick={() => setEditService(service)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Service Modal */}
      {editService && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Service</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditService(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editService.name}
                  onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                />
                <select
                  className="form-control mb-2"
                  value={editService.type}
                  onChange={(e) => setEditService({ ...editService, type: e.target.value })}
                >
                  <option value="Normal">Normal</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditService(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateService}
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

export default Services;
