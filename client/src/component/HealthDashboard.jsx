import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
function HealthDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/health-records')
      .then(response => setRecords(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:3000/health-records/${id}`)
      .then(() => setRecords(records.filter(record => record._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Health Records</h2>
      <table border={2} class='btable'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Body Temperature</th>
            <th>Blood Pressure</th>
            <th>Heart Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.name}</td>
              <td>{record.bodyTemperature}</td>
              <td>{`${record.bloodPressure.systolic}/${record.bloodPressure.diastolic}`}</td>
              <td>{record.heartRate}</td>
              <td>
                <button onClick={() => deleteRecord(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthDashboard;
