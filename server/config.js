import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET_KEY'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    refreshSecretKey: required('JWT_REFRESH_SECRET_KEY'),
    refreshExpiresInSec: parseInt(required('JWT_EXPIRES_SEC')),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 3000)),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
  mail:{
    service : required('MAIL_SERVICE'),
    host : required('MAIL_HOST'),
    port : required('MAIL_PORT'),
    user : required('MAIL_USER'),
    pw : required('MAIL_PW'),
  }
};
