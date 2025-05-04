import pool from '../../../common/db.js';

export async function editClientsUseCase({ cpf, name, phones, emails }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `UPDATE clients SET name = ? WHERE cpf = ?`,
      [name, cpf]
    );

    const [rows] = await conn.query(
      `SELECT id FROM clients WHERE cpf = ?`,
      [cpf]
    );
    const clientId = rows[0]?.id;
    if (!clientId) throw new Error('Cliente não encontrado.');

    await conn.query(`DELETE FROM phones WHERE client_id = ?`, [clientId]);
    if (phones.length > 0) {
      const phoneInserts = phones.map((phone) => [clientId, phone]);
      await conn.query(`INSERT INTO phones (client_id, phone) VALUES ?`, [phoneInserts]);
    }

    await conn.query(`DELETE FROM emails WHERE client_id = ?`, [clientId]);
    if (emails.length > 0) {
      const emailInserts = emails.map((email) => [clientId, email]);
      await conn.query(`INSERT INTO emails (client_id, email) VALUES ?`, [emailInserts]);
    }

    await conn.commit();
    return { success: true };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
