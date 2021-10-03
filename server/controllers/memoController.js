import * as memoModel from '../models/memoModel.js';
import 'express-async-errors';

export async function list(req,res) {
    try{
        const {userSno} = req.decoded;
        const result = await memoModel.listMemo(userSno);
        res.status(200).json(result);
    }catch(err){
        console.log('err : ', err);
    }
};

export async function create(req,res) {
    try{
        const memo = req.body;
        const result = await memoModel.createMemo(memo);
        res.status(201).json(result);
    }catch(err){
        console.log('err : ', err);
    }
};

export async function detail(req,res) {
    try{
        const {memoId} = req.params;
        const {userSno} = req.decoded;
        const params = {
            memoId : memoId,
            userSno : userSno,
        }

        const result = await memoModel.detailMemo(params);
        res.status(200).json(result);
    }catch(err){
        console.log('err : ', err);
    }
};

export async function update(req,res) {
    try{
        const { memoId } = req.params;
        const { userSno } = req.decoded;
        const { memoContent } = req.body;

        const params = {
            memoId : memoId,
            userSno : userSno,
            memoContent : memoContent,
        }
        const result = await memoModel.updateMemo(params);
        if(result > 0){
            res.status(200).json(result);
        }else{

        }
    }catch(err){
        console.log('err : ', err);
    }
};

export async function remove(req,res){
    try{
        const { memoId } = req.params;
        const { userSno } = req.decoded;

        const params = {
            memoId : memoId,
            userSno : userSno,
        }
        const result = await memoModel.removeMemo(params);
        
        if( result > 0 ){
            res.status(200).json(result);
        }else{

        }
    }catch(err){
        console.log('err : ', err);
    }
};