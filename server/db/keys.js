import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '',
    database: 'educationportal'
});

module.exports = pool;