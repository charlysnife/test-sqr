const jwt = require('jsonwebtoken');
const withdrawFundByUserId = require('../db/withdrawFundByUserId');

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
                    let rst = await withdrawFundByUserId(decoded.data.id, req.body.amount)
                
                    if(rst == 1) {
                        return res.status(200).send({message: 'Fund withdrawed successfully'});
                    } else {
                        return res.status(200).send({message: 'You can not request amount more than available balance'});
                    }
                }
            }
        });
    } else {
        // Forbidden
        res.status(403).send({message: 'Invalid authorization'});
    }
}