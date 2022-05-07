import express from 'express';
import message from './router/message';
import stream from './router/stream';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.all('*', (_, res, next) => {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Content-Type");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

app.use('/message', message);
app.use('/stream', stream);

app.listen(8848, () => {
  console.log("start")
});
