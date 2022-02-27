const jwt = require('jsonwebtoken');
const fetchUserByEmail = require('../db/fetchUserByEmail')
const bcrypt = require('bcryptjs');

module.exports = async function(req, res) {
    let validate = true
    let errors = []

    if(req.body.email === '' || req.body.email === undefined || req.body.email === null) {
        validate = false
        errors.push({email_error: 'Please enter a valid email addresss'})
    } 

    if(req.body.password === '' || req.body.password === undefined || req.body.password === null) {
        validate = false
        errors.push({password_error: 'Please enter your password'})
    }


    if(validate) {
        // jwt.sign({ data: user}, 'secret', { expiresIn: '1h' });
        let user = await fetchUserByEmail(req.body.email)
        if(user.length) {
            if(bcrypt.compareSync(req.body.password.trim(), user[0].password)) {
                let token = jwt.sign({ data: {id: user[0].id, first_name: user[0].first_name, last_name: user[0].last_name}}, 'secret', { expiresIn: '1h' });
                return res.status(200).send({message: 'User logged in successfully', token})
            } else {
                return res.status(200).send({message: 'Invalid login credentials'})
            }
        } else {
            return res.status(200).send({message: 'Invalid login credentials'})
        }
    } else {
        return res.status(200).send({errors: errors})
    }
}