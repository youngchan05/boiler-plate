const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://youngchan:cksl6814@boilerplate-awtvp.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false, //에러방지
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))
app.get('/', (req, res) => res.send('Hello World! 안녕하세요1111'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))