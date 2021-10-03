import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js';
import moment from 'moment';

export const User = sequelize.define(
    'user',
    {
        userId :{
            type : Sequelize.INTEGER,
            autoIncrement :true,
            allowNull : false,
            primaryKey :true,
            comment : '유저 식별 아이디',
        },
        userEmail : {
            type : Sequelize.STRING(128),
            allowNull : false,
            comment : '유저 이메일',
        },
        userPw : {
            type : Sequelize.STRING(128),
            allowNull : false,
            comment : '유저 패스워드',
        },
        userNm : {
            type : Sequelize.STRING(128),
            allowNull : false,
            comment : '유저 이름',
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

export async function findByUserEmail(userEmail){
    return User.findOne({ where  : {userEmail}});
};

export async function findById(id) {
    return User.findByPk(id);
};

export async function createUser(user){
    return User.create(user).then((data)=>data.dataValues.userId);
};