import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js';
import moment from 'moment';

export const Memo = sequelize.define(
    'memo',
    {
        memoId : {
            type : Sequelize.INTEGER,
            autoIncrement :true,
            allowNull : false,
            primaryKey : true,
            comment : '메모ID',
        },
        userSno : {
            type : Sequelize.STRING(128),
            allowNull : false,
            comment : '유저번호',
        },
        memoContent : {
            type : Sequelize.STRING(128),
            allowNull : false,
            comment : '메모내용',
        },
        regDate : {
            type : Sequelize.DATE,
            defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
            comment : '등록일자',
        },
        updDate : {
            type : Sequelize.DATE,
            defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
            comment : '수정일자',
        }
    },
    {
        timestamps : false,
        underscored : true,
    },
);

export function listMemo(userSno){
    return Memo.findAll({
         where : {userSno},
         order : [["regDate", "desc"]],
    });
};

export function createMemo(params){
    return Memo.create(params).then((data)=>data.dataValues);
};

export function detailMemo(params){
    return Memo.findOne({ where : {
        memoId : params.memoId,
        userSno : params.userSno,
    }});
}

export function updateMemo(params){
    return Memo.update({
        memoContent : params.memoContent,
        updDate : moment().format("YYYY-MM-DD HH:mm:ss")},
        {where :{
            memoId : params.memoId,
            userSno : params.userSno,
            }
        }
    ).then((data)=>data);
}

export function removeMemo(params){
    return Memo.destroy({
        where : {
            memoId : params.memoId,
            userSno : params.userSno,
        }
    }).then((data)=>data);
}