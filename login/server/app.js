const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//place your code below
let db = [
    {id: 1, username: 'John', password: '111'},
    {id: 2, username: 'Edward', password: '222'}
];

app.post('/login', (req, res, next)=> {
    const user = db.find(user => user.username === req.body.username && user.password === req.body.password);
    if(user){
        res.json({accessToken: `${user.id}-${user.username}-${Date.now().toString()}`})
    } else {
        res.json({error: 'Invalid username and password!'});
        // throw new Error('dfdfdf');
    }
});

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    // console.log();
    const token = auth.split(' ')[1]
    if(token === 'null'){
        res.json({error: 'No Access Token'});
    } else {
        req.user = token.split('-')[0];
        next();
    }
})

app.get('/products', (req, res, next) => {
    // req.user
    res.json({title: 'DELL Laptop'});
})

app.use((error, req, res, next)=>{
    res.status(500).json({error: 'Invalid username and password!'});
})


app.listen(3000, () => console.log('listening to 3000...'));
