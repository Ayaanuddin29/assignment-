const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path=require('path');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://khajaayaan2912:Ag5EOEvLTiDPmnda@cluster0.oje1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("DB is Connected")
}).catch((err)=>{
    console.log(err);
});
app.use(express.static(path.join(__dirname,'/client/dist')));

// Define Health Record Schema
const healthRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name:{type:String,required:true},
  bodyTemperature: { type: Number, required: true },
  bloodPressure: {
    systolic: Number,
    diastolic: Number
  },
  heartRate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Model
const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

// Routes

// POST /health-records (Create new health record)
app.post('/health-records', async (req, res) => {
  try {
    const newRecord = new HealthRecord(req.body);
    await newRecord.save();
    res.status(201).send(newRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /health-records (Retrieve all health records)
app.get('/health-records', async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET /health-records/:id (Retrieve a specific record by ID)
app.get('/health-records/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) return res.status(404).send();
    res.send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT /health-records/:id (Update a specific record)
app.put('/health-records/:id', async (req, res) => {
  try {
    const updatedRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedRecord) return res.status(404).send();
    res.send(updatedRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE /health-records/:id (Delete a specific record)
app.delete('/health-records/:id', async (req, res) => {
  try {
    const deletedRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).send();
    res.send(deletedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
});
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
