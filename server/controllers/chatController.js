import { Server }  from 'socket.io';

export async function chat(req,res){
    try{
        res.render('chat/chat');
    }catch{

    }
}