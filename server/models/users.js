import Sequelize from 'sequelize';
import { sequelize } from '../database/db.js';

export const User = sequelize.define(
    'user',
    {
        user_sno :{
            type : Sequelize.INTEGER,
            autoIncrement :true,
            allowNull : false,
            primaryKey :true,
        },
        user_id : {
            type : Sequelize.STRING(128),
            allowNull : false,
        },
        user_nm : {
            type : Sequelize.STRING(128),
            allowNull : false,
        },
        user_pw : {
            type : Sequelize.STRING(128),
            allowNull : false,
        },
        user_email : {
            type : Sequelize.STRING(128),
            allowNull : false,
        }
    },
    {
        timestamps : false,
    },
);

export async function findByUserId(user_id){
    return User.findOne({ where  : {user_id}});
};

export async function findBySno(sno) {
    return User.findByPk(sno);
};

export async function createUser(user){
    return User.create(user).then((data)=>data.dataValues.user_sno);
};