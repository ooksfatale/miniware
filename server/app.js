import express          from 'express';
import cors             from 'cors';
import hpp              from 'hpp';
import morgan           from 'morgan';
import helmet           from 'helmet';
import userRouter       from './routes/users.js';
import { config }       from './config.js';
import { sequelize }    from './database/db.js';
import 'express-async-errors';

const app =  express();

app.use(express.json());
app.use(hpp());
app.use(helmet());
app.use(cors({origin: true,credentials:true})); 
app.use(morgan('dev'));


app.use('/users', userRouter);


sequelize.sync()
.then((data)=>console.log('db connect'))
.catch((err) =>console.log('DB error : ',err));

app.listen(config.host.port);