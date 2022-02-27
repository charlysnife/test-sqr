const jwt = require('jsonwebtoken');
const fundWalletByUserId = require('../db/fundWalletByUserId');

module.exports = async function(req, res) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, 'secret', async function(err, decoded) {
            if(err) {
                return res.status(403).send({message: 'Invalid authorization'});
            } else {
                if(req.body.amount === '' || req.body.amount === undefined || req.body.amount === null) {
                    return res.status(200).send({message: 'Please amount is required'});
                } else {
                    await fundWalletByUserId(decoded.data.id, req.body.amount)
                    return res.status(200).send({message: 'Wallet funded successfully'});
                }
            }
        });
    } else {
        // Forbidden
        res.status(403).send({message: 'Invalid authorization'});
    }
}