const express = require('express');
const volleyball = require('volleyball');
const app = express();

app.use(express.json());
app.use(volleyball);

const port = 8000

app.listen(port,()=>{
    console.log(`App started on port ${port}`);
});