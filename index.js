import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// get all the restaurant data
app.get('/burgers', (req, res) => {
  const url = process.env.ENDPOINT
    
  const options = {
    method: 'GET',
    headers: {
      'X-Cassandra-Token':process.env.ASTRA_TOKEN,       
      Accept: 'application/json',
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});
function notfound(req, res, next){
    res.status(404);
    const error = new Error('Not Found - ${req.originalUrl}');
    next(error);
}
function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
    });
}
app.use(notfound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);