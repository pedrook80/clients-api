import pool from '../../../common/db.js';

export  async function editClientsUseCase({ id, cpf, name, phones, emails }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `UPDATE clients SET cpf = ?, name = ? WHERE id = ?`,
      [cpf, name, id]
    );

    await conn.query(`DELETE FROM phones WHERE client_id = ?`, [id]);
    if (phones.length > 0) {
      const phoneInserts = phones.map((phone) => [id, phone]);
      await conn.query(`INSERT INTO phones (client_id, phone) VALUES ?`, [phoneInserts]);
    }

    await conn.query(`DELETE FROM emails WHERE client_id = ?`, [id]);
    if (emails.length > 0) {
      const emailInserts = emails.map((email) => [id, email]);
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
