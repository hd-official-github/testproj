var jwt = require('jsonwebtoken');

async function login(req, res) {
    const { username, password } = req.body;
    if (username && password)
        if (password != 'admin') {
            res.status(401).json({ err: "Incorrect credentials" })
        } else {
            var token = jwt.sign({ username: username }, 'secrettoken');
            res.status(200).json({ token: `Bearer ${token}` })
        }
}

module.exports = { login }