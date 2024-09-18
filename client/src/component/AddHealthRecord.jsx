import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
function AddHealthRecord() {
  const [form, setForm] = useState({
    date: '',
    name:'',
    bodyTemperature: '',
    systolic: '',
    diastolic: '',
    heartRate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      date: form.date,
      name:form.name,
      bodyTemperature: parseFloat(form.bodyTemperature),
      bloodPressure: {
        systolic: parseInt(form.systolic),
        diastolic: parseInt(form.diastolic)
      },
      heartRate: parseInt(form.heartRate)
    };

    axios.post('http://localhost:3000/health-records', newRecord)
      .then(response => {
        alert('Record added successfully');
        setForm({
          date: '',
          name:"",
          bodyTemperature: '',
          systolic: '',
          diastolic: '',
          heartRate: ''
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      <label>Name:</label>
      <input class='pad' type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <label>Body Temperature:</label>
      <input type="number" value={form.bodyTemperature} onChange={(e) => setForm({ ...form, bodyTemperature: e.target.value })} required />

      <label>Blood Pressure (Systolic/Diastolic):</label>
      <input type="number" value={form.systolic} onChange={(e) => setForm({ ...form, systolic: e.target.value })} required />
      <input type="number" value={form.diastolic} onChange={(e) => setForm({ ...form, diastolic: e.target.value })} required />

      <label>Heart Rate:</label>
      <input type="number" value={form.heartRate} onChange={(e) => setForm({ ...form, heartRate: e.target.value })} required />

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddHealthRecord;
