import { MongoHelper } from '../infra/data/mongodb/helper/mongo-helper'
import app from './config/app'
import dotenv from 'dotenv'
import path from 'path'

app.listen(8080, () => {
    dotenv.config({path: path.resolve(__dirname,'../../.env')})
    console.log(`Server running at http://localhost:8080`) 
    MongoHelper.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/challenge?authSource=admin` || 'localhost')
    .then(async () => {
        console.log('Connected to mongodb')
    })
    .catch(console.error)
})
