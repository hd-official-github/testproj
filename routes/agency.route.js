const express = require('express')
const AgencyController = require('../controller/createAgencyController')
const authMiddleware = require('../middlewares/authMiddleware')
const validate = require('../middlewares/validate')
const agencySchema = require('../validators/agency.validator')
const clientUpdateSchema = require('../validators/updateclient.validate')

const router = express.Router()

router.post('/create_agency', authMiddleware, validate(agencySchema), AgencyController.createAgency)
router.post('/update_client/:agencyid', authMiddleware, validate(clientUpdateSchema), AgencyController.updateClient)
router.get('/getagency', AgencyController.getagency)
router.get('/getagencyclientdetails', authMiddleware, AgencyController.getagencyclientdetails)


module.exports = router