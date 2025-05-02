import db from '../../../common/db.js';
import bcrypt from 'bcryptjs';

export default async function createUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  return { name, email };
}