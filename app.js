import express          from 'express';
import cors             from 'cors';
import hpp              from 'hpp';
import morgan           from 'morgan';
import { config }       from './server/config.js';
import { sequelize }    from './server/database/db.js';
import memoRouter       from './server/routes/memoRouter.js';
import userRouter       from './server/routes/usersRouter.js';
import chatRouter       from './server/routes/chatRouter.js';
import { mailer }       from './server/middleware/mail.js';
import http             from 'http';
import { Server }       from 'socket.io';
import path             from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import 'express-async-errors';

const app = express();
const __dirname = path.resolve();

app.use(cors({origin: true,credentials:true}));
app.use(morgan('dev'));
app.use(hpp());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')));

app.set('layout','./layouts/layout');
app.set("layout extractScripts", true)
app.set('view engine', 'ejs');

//router
app.use('/users', userRouter);
app.use('/memos', memoRouter);
app.use('/chat', chatRouter);
app.use('/mail', mailer);


//Maria db sequelize
sequelize.sync()
.then((data)=>console.log('db connect'))
.catch((err) =>console.log('DB error : ',err));

// web server start
const httpServer = http.createServer(app);
httpServer.listen(config.host.port,()=>{
    console.log(`${config.host.port} port start`);
});

//socket io start
const io = new Server(httpServer, {cors:{origin:"*"}});

io.on('connection', (socket) =>{
    console.log(socket.id, 'Connect');
    socket.emit('usercount', io.engine.clientsCount);

    socket.on('message', (msg)=>{
        console.log('Message received : ',msg);
        io.emit('message',msg);
        
    });

    socket.on('dissconnect',()=>{
        io.emit('message','A user has left the chat');
    });
});;

