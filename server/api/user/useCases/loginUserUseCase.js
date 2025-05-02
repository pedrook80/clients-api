import db from '../../../common/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function loginUser({ email, password }) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];
  if (!user) throw new Error('Usuário invalido');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Usuário invalido');

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
}
