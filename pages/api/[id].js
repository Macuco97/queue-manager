import { ConstructionOutlined, UpdateOutlined } from "@mui/icons-material";
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
  let { position, name, phone, action } = body

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
  
 if(req.method === "PUT") {
    if (body.action === "goDown") {
      const currentClient = await clients.findOne({position: position})
      const beforeClient = await clients.findOne({position: position+1})
      await clients.updateOne({_id: currentClient._id}, {$inc: {position: 1}})
      await clients.updateOne({_id: beforeClient._id}, {$inc:{position: -1}})
    }
    else if (body.action === "goUp") {
      const currentClient = await clients.findOne({position: position})
      const nextClient = await clients.findOne({position: position-1})
      await clients.updateOne({_id: currentClient._id}, {$inc: {position: -1}})
      await clients.updateOne({_id: nextClient._id}, {$inc:{position: 1}})
      
    }
  }

  if(req.method === "DELETE") {
    await clients.deleteOne({position: position})

    await clients.updateMany({position: {$gt: position}}, {$inc:{position: -1}})
  }

  const response = await clients.find({}).sort({position: 1}).toArray()
  await client.close()
  res.status(200).json(response)
}

