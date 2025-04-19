require('dotenv').config();
const express = require('express');
const Connection = require('./Config/db');
const userRouter = require('./Routes/user.route');
const bookRouter = require('./Routes/book.route');
const borrowRouter = require('./Routes/borrow.route');
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware to parse JSON request bodies
app.use(express.json())
app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

// Homepage route
app.get('/', (req, res)=>{
    res.send('Welcome to my Library management system API')
})

// Error Handling middleware
app.use((req, res)=>{
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

app.listen(PORT, async () => {
    try {
        await Connection;
        console.log(`server is running on Port : ${PORT} : and connected to database`);
    } catch (error) {
        console.log(error);
    }
});