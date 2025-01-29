import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './MeasurementForm.css';

const MeasurementForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const [formData, setFormData] = useState({
    customerId: initialData.customerId || "",
    neckSize: initialData.neckSize || "",
    chestSize: initialData.chestSize || "",
    shoulderLength: initialData.shoulderLength || "",
    sleeveLength: initialData.sleeveLength || "",
    jacketLength: initialData.jacketLength || "",
    waistSize: initialData.waistSize || "",
    hipSize: initialData.hipSize || "",
    pantLength: initialData.pantLength || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert('Measurements saved successfully!');
  };

  const handlePlaceOrder = () => {
    navigate('/place-order');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSave} className="form-grid">
        {/* Customer ID */}
        <div className="form-group">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Neck Size */}
        <div className="form-group">
          <label htmlFor="neckSize" className="form-label">
            Neck Size (in inches)
          </label>
          <input
            type="number"
            id="neckSize"
            name="neckSize"
            value={formData.neckSize}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Chest Size */}
        <div className="form-group">
          <label htmlFor="chestSize" className="form-label">
            Chest Size (in inches)
          </label>
          <input
            type="number"
            id="chestSize"
            name="chestSize"
            value={formData.chestSize}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Shoulder Length */}
        <div className="form-group">
          <label htmlFor="shoulderLength" className="form-label">
            Shoulder Length (in inches)
          </label>
          <input
            type="number"
            id="shoulderLength"
            name="shoulderLength"
            value={formData.shoulderLength}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Sleeve Length */}
        <div className="form-group">
          <label htmlFor="sleeveLength" className="form-label">
            Sleeve Length (in inches)
          </label>
          <input
            type="number"
            id="sleeveLength"
            name="sleeveLength"
            value={formData.sleeveLength}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Jacket Length */}
        <div className="form-group">
          <label htmlFor="jacketLength" className="form-label">
            Jacket Length (in inches)
          </label>
          <input
            type="number"
            id="jacketLength"
            name="jacketLength"
            value={formData.jacketLength}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Waist Size */}
        <div className="form-group">
          <label htmlFor="waistSize" className="form-label">
            Waist Size (in inches)
          </label>
          <input
            type="number"
            id="waistSize"
            name="waistSize"
            value={formData.waistSize}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Hip Size */}
        <div className="form-group">
          <label htmlFor="hipSize" className="form-label">
            Hip Size (in inches)
          </label>
          <input
            type="number"
            id="hipSize"
            name="hipSize"
            value={formData.hipSize}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Pant Length */}
        <div className="form-group">
          <label htmlFor="pantLength" className="form-label">
            Pant Length (in inches)
          </label>
          <input
            type="number"
            id="pantLength"
            name="pantLength"
            value={formData.pantLength}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Save Measurements Button */}
        <div className="form-footer">
          <button
            type="submit"
            className="submit-btn"
          >
            Save Measurements
          </button>
        </div>

        {/* Place Order Button */}
        <div className="form-footer">
          <button
            onClick={handlePlaceOrder}
            type="button" // Prevent form submission
            className="add-measurements-btn"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeasurementForm;