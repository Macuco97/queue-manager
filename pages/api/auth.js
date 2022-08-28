const { MongoClient } = require("mongodb");

export default async function (req, res){
    const client = new MongoClient(process.env.mongodbURL)
    const database = await client.db('client')
    const users = await database.collection('users')
    const { body, method } = req
    const collectionQuery = await users.find({}).toArray()
    const usersList = collectionQuery[0]
    let response
    console.log(usersList[0])
    console.log(usersList.user, usersList.password, body.user, body.password)
    if (usersList.user == body.user && usersList.password == body.password) {
        response = true
    }
    else {
        response = false
    }

    res.status(200).json(response)
}

