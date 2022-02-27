const jwt = require('jsonwebtoken');
const transferFundByUserId = require('../db/transferFundByUserId');

module.exports = async function(req, res) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, 'secret', async function(err, decoded) {
            if(err) {
                return res.status(403).send({message: 'Invalid authorization'});
            } else {
                let errors = []
                if(req.body.amount === '' || req.body.amount === undefined || req.body.amount === null) {
                    errors.push({amount_error: 'Please amount is required'})
                } 

                if(req.body.receiver_id === '' || req.body.receiver_id === undefined || req.body.receiver_id === null) {
                    errors.push({receiver_error: 'Please specify tranfer recipeint'})
                }
                
                if(errors.length) {
                    return res.status(200).send({errors: errors})
                } else {
                    let rst = await transferFundByUserId(decoded.data.id, req.body.receiver_id, req.body.amount)
                
                    if(rst == 1) {
                        return res.status(200).send({message: 'Fund transfered successfully'});
                    } else {
                        return res.status(200).send({message: 'You can not transfer amount more than available balance'});
                    }
                }
            }
        });
    } else {
        // Forbidden
        res.status(403).send({message: 'Invalid authorization'});
    }
}