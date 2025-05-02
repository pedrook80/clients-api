import pool from '../../../common/db.js';

export async function showClientsUseCase(id) {
  const conn = await pool.getConnection();
  try {
    const [clients] = await conn.query(`SELECT * FROM clients WHERE id = ?`, [id]);
    if (!clients.length) return null;

    const client = clients[0];

    const [phones] = await conn.query(`SELECT phone FROM phones WHERE client_id = ?`, [id]);
    const [emails] = await conn.query(`SELECT email FROM emails WHERE client_id = ?`, [id]);

    return {
      id: client.id,
      cpf: client.cpf,
      name: client.name,
      phones: phones.map(p => p.phone),
      emails: emails.map(e => e.email),
    };
  } finally {
    conn.release();
  }
}
