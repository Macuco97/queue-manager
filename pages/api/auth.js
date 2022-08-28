const { MongoClient } = require("mongodb");

export default async function (req, res){
    const client = new MongoClient(process.env.mongodbURL)
    const database = await client.db('client')
    const users = await database.collection('users')
    const { body, method } = req
    const usersList = await users.find({}).toArray()
   
    res.status(200).json(usersList)
}

