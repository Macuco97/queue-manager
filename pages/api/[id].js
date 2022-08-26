import { ObjectID } from "bson";

const { MongoClient } = require("mongodb");



export default async function (req, res){
  const client = new MongoClient(process.env.mongodbURL)
  const database = await client.db('client')
  const clients = await database.collection('client')
  
  const { body, method } = req

  if(req.method === "POST") {
    const response = await clients.find({}).toArray()
    if(response.length == [].length) {
      console.log('Chegou aqui')
      body.position = 1
    }
    else {
      const positions = []
      response.map(client => {
        positions.push(client.position)
      })
      console.log(positions)
      const highestPosition = positions.reduce(function(a, b) {
        return Math.max(a, b);
      }, -Infinity)
      body.position = highestPosition + 1
      }
    console.log(body)
    await clients.insertOne(body)
    }
  

  if(req.method === "DELETE") {
    await clients.deleteOne({_id: ObjectID(body.id)})
  }

  const response = await clients.find({}).toArray()
  await client.close()
  res.status(200).json(response)
}

