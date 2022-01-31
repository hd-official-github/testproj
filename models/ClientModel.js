const mongoose = require('mongoose')
// ClientId, AgencyId, Name, Email, PhoneNumber, TotalBill (all are required fields)
const ClientModel = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    agencyID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    totalBill: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model('Client', ClientModel)