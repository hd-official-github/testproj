const AgencyModel = require("../models/AgencyModel");

const { v4: uuidv4 } = require('uuid');
const ClientModel = require("../models/ClientModel");
async function createAgency(req, res) {
    // console.log(req.body)
    const agency = req.body;
    const newagencyid = uuidv4();
    const result = await AgencyModel.create({ agencyID: newagencyid, ...agency });
    if (agency.client) {
        const sts = await addClient(agency.client, newagencyid)
        if (!sts) {
            res.status(500).send({ err: "Internal server error" });
            res.end();
        }
    }
    res.status(201).json({ result, "created": true })

}

async function addClient(clients, agencyId) {
    clients.forEach(async (client) => {
        const newClientId = uuidv4();
        const result = await ClientModel.create({ agencyID: agencyId, clientId: newClientId, ...client });
        const updateAgency = await AgencyModel.findOneAndUpdate({ agencyID: agencyId }, { $push: { clients: result._id } })
    });
    return true
}
async function updateClient(req, res) {
    // console.log(req.body)
    const { agencyid } = req.params;
    const client = req.body
    try {
        const result = await ClientModel.findOneAndUpdate({ agencyID: agencyid, clientId: client.clientId }, { $set: { ...client } })
        if (result)
            res.status(200).json({ result, "updated": true });
        else
            res.status(500).json({ err: "Internal server error" })
    } catch (err) {
        res.status(500).json(err)
    }
}


async function getagency(req, res) {

    const result = await AgencyModel.find().populate('clients');
    res.json({ result })

}
async function getagencyclientdetails(req, res) {

    const result = await AgencyModel.aggregate(
        [
            {
                "$lookup": {
                    "from": ClientModel.collection.name,
                    "localField": "clients",
                    "foreignField": "_id",
                    "as": "clients"
                }
            },
            { $unset: ["clients.clientId", "clients.phone", "clients.agencyID", "clients.email", "clients._id", "clients.__v",] },
            {
                $project: {
                    "agency_name": "$name",
                    "client": {
                        $reduce: {
                            input: "$clients",
                            initialValue: {},
                            in: {
                                $cond: [{ "$gt": ["$$this.totalBill", "$$value.totalBill"] }, // Condition Check
                                    "$$this",      // If condition true ($$this - Current Object)  
                                    "$$value"      // If condition false $$value - Previous Returned Object
                                ]
                            }
                        }
                    },
                }
            }
        ],
        function (err, result) {
            if (err) {
                res.status(500).json({ err: "Server error" })
            }
            res.status(200).json(result)

        }
    );
}
module.exports = {
    createAgency,
    updateClient,
    getagency,
    getagencyclientdetails
}