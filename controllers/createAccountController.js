const insertUser = require('../db/insertUser')

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

    if(req.body.firstname === '' || req.body.firstname === undefined || req.body.firstname === null) {
        validate = false
        errors.push({firstname_error: 'Please enter your firstname'})
    }

    if(req.body.lastname === '' || req.body.lastname === undefined || req.body.lastname === null) {
        validate = false
        errors.push({lastname_error: 'Please enter your lastname'})
    }


    if(validate) {
        let result = await insertUser(req.body)
        if(Object.keys(result).length) {
            return res.status(200).send({message: "User created successfully"})
        } else {
            return res.status(200).send({message: "Email has already been used"})
        }
    } else {
        return res.status(200).send({errors: errors})
    }
}