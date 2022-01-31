const express = require('express')
const { router } = require('./routes')
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://testmongodb:testmongo@cluster0.cxwsm.mongodb.net/test?authSource=admin&replicaSet=atlas-4z9udf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('connected'))
    .catch(error => console.log("ERROR MONGODB ", error));

app.use('/api', router)

const model_path = "./models"
fs.readdirSync(model_path).forEach((file) => {
    console.log("LOADED FILE ", file);
    if (file.indexOf('.js') > 0) {
        var urldata = './models/' + file
        import(urldata);
    }
})
app.listen(3000, () => console.log('listening on port 3000'));