import { UpdateOutlined } from "@mui/icons-material";
import { ObjectID } from "bson";
import { withTheme } from "styled-components";

const { MongoClient } = require("mongodb");



export default async function (req, res){
  const client = new MongoClient(process.env.mongodbURL)
  const database = await client.db('client')
  const clients = await database.collection('client')
  const { body, method } = req
  const clientList = await clients.find({}).toArray()
  const positions = []
  const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i)


  let { position } = body

  clientList.map(client => {
    positions.push(client.position)
  })
  const highestPosition = positions.reduce(function(a, b) {
    return Math.max(a, b);
  }, -Infinity)

  if(req.method === "POST") {
    if(clientList.length == [].length) {
      body.position = 0
    }
    else {
      const positions = []
      clientList.map(client => {
        positions.push(client.position)
      })
      
      body.position = highestPosition + 1
      }
    await clients.insertOne(body)
    }
  

  if(req.method === "DELETE") {
    const positionsChanged = range(position, positions.length - 1)
    await clients.deleteOne({position: position})
    if(positionsChanged.length == 1) {
      await clients.deleteOne({position: position})
    }
    else {
      positionsChanged.map(async i => {
        if(i != positionsChanged - 1) {
          await clients.updateOne({position: i + 1}, {$set:{position: i}})
          await clients.find({position: i + 1})
        }
      })
    }
  }

  const response = await clients.find({}).toArray()
  await client.close()
  res.status(200).json(response)
}

