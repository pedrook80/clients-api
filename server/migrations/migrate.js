// src/database/migrate.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const migrationPath = path.join(process.cwd(), 'src', 'database', 'schema.sql');
const sql = fs.readFileSync(migrationPath, 'utf8');

const connectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
};

async function migrate() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);
    await connection.query(sql);
    console.log('✅ Migração executada com sucesso.');
    await connection.end();
  } catch (err) {
    console.error('❌ Erro na migração:', err);
    process.exit(1);
  }
}

migrate();
