const fetchUsers = require('../db/fetchUsers')

module.exports = async function(req, res) {
    let users = await fetchUsers()
    return res.status(200).send(users)
}