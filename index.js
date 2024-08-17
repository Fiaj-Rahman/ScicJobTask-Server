const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// middleware

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.neywkpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const AllProducts = client.db('ScicJobTask').collection('AllProduct');


    // app.get('/AllProducts', async(req,res)=>{
    //   const cursor = AllProducts.find()
    //   const result = await cursor.toArray()
    //   res.send(result)
    // })

    

    app.get('/AllProducts', async (req, res) => {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
      const skip = (page - 1) * limit;
  
      try {
          const cursor = AllProducts.find().skip(skip).limit(limit);
          const result = await cursor.toArray();
          const totalProducts = await AllProducts.countDocuments();
          res.send({
              data: result,
              totalPages: Math.ceil(totalProducts / limit),
              currentPage: page
          });
      } catch (error) {
          res.status(500).send({ message: 'Error fetching products' });
      }
  });



    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);



app.listen(port,()=>{
    console.log(`Online shop server is running on port ${port}`)
})