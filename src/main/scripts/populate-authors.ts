import fs from 'fs'
import readline from 'readline'
import { MongoClient} from 'mongodb'
import  path  from 'path'

(async () => {
    const connection = await MongoClient.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}/challenge?authSource=admin`)

        console.log('connection to database open')
        let readalineInterface =  readline.createInterface({
            input: fs.createReadStream(path.join(process.cwd(),'/files/authors.csv'),
            {
                encoding: 'latin1'
            })
        })
    
        console.log('started')
        readalineInterface.on('line', (line: any) => {
            console.log('inserting: '+line+'\n')
            connection.db().collection('authors').insertOne(
                {
                    name: line
                }
            )
        })
    
        readalineInterface.on('close',() => { 
            console.log('finished')
        })
    
})()
  
     
