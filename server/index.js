import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }))

//app.use(cors());

app.use(cors({ origin: '*', credentials: true }));


app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send('API running')
})

const PORT = process.env.PORT || 5000
const URL = 'mongodb+srv://gordon:gordon123@cluster0.a8rai.mongodb.net/GymBud?retryWrites=true&w=majority'

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));  