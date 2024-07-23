const express = require('express')
const mongoose = require('mongoose')

const productRoutes = require('./routes/ProductRoutes.js')
const Product = require('./models/ProductModel.js')
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Route
app.use("api/products", productRoutes)

app.get('/api/products', async (req, res) => {
    try {
        const produt = await Product.find({})
        res.status(200).json(produt)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/api/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({message:"Product not found"})
        }

        const updateProduct = await Product.findById(id);

        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/api/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        res.status(200).json({message: "Product deleted succesfully"})
    } catch (error) {
        res.status(500).json({message:"Product not found"})
    }
})

mongoose.connect("mongodb+srv://zalempablo:pablo1764@cluster0.qunzx9j.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to database')
}).catch(() => {
    console.log('Connection failed')
})

app.listen(8000, () =>{
    console.log('Servidor subiu na porta 8000');
})