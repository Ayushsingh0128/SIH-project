require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { workerModel } = require('./src/Models/worker.model');

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_labour_portal');
        console.log("Connected to DB");
        
        const worker = await workerModel.findOne();
        if (!worker) {
            console.log("No worker found in DB!");
            process.exit(1);
        }
        console.log("Found worker:", worker.email);
        
        const token = jwt.sign({ id: worker._id, role: 'worker' }, process.env.JWT_SECRET);
        
        const response = await fetch('http://localhost:3000/workers/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ availability: false })
        });
        
        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response:", data);
        
    } catch (error) {
        console.error("Error in script:", error);
    } finally {
        mongoose.disconnect();
    }
}

run();
