const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// AgencyId, Name, Address1, Address2, State, City, Phone Number
// Beside Address2 all other fields are required.

const AgencySchema = new Schema({
    agencyID: {
        type: String,
        auto: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }]

});


module.exports = mongoose.model('Agency', AgencySchema);
