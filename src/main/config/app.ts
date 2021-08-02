import express  from 'express'
import setupRoutes from './routes'
import { json } from 'express'
const app = express()

app.use(json())
setupRoutes(app)
export default app