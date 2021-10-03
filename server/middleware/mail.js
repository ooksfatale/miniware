import nodemailer       from 'nodemailer';
import { config }       from '../config.js';


export const mailer = async()=>{

    const mailOption = {
        from  : 'ooksfatale@gmail.com',
        to : 'hitlist@naver.com',
        subject : 'nodeemailer테스트',
        html : '<h1>두두다다</h1>',
    };

    const transporter = nodemailer.createTransport({
        service: config.mail.service,
        host : config.mail.host,
        port : config.mail.port,
        auth : {
            user : config.mail.user,
            pass : config.mail.pw,
        },
        tls : {
            rejectUnauthorized :false,
        },
        maxConnections: 5,
        maxMessages: 10,
    });

    transporter.sendMail(mailOption,(err,res)=>{
        if(err){
            console.log('falied',err);
        }else{
            console.log('succes',res);
        }
        transporter.close();
    });

}