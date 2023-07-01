const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

//middelware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ouis0tq.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri, 'hello url')
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {

    try {
        await client.connect();
        console.log('hello final')
        const newsCollection = client.db("marketshop").collection('market');
        const productCollection = client.db("marketshop").collection("product");


        app.get('/market', async (req, res) => {
            const query = {};
            const news = newsCollection.find(query);
            const newsSite = await news.toArray();
            res.send(newsSite)
        });


        app.get('/product', async (req, res) => {
            const query = {};
            const products = productCollection.find(query);
            const product = await products.toArray();
            res.send(product);
        });

        // app.get('market/:id', async (req, res) => {

        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const news = await newsCollection.findOne(query);
        //     res.send(news)

        // })






    } finally {

        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {

    res.send('Hello World! Rashel')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})