import pool from '../../../common/db.js';

export async function deleteClientsUseCase(id) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(`DELETE FROM phones WHERE client_id = ?`, [id]);
    await conn.query(`DELETE FROM emails WHERE client_id = ?`, [id]);
    const [result] = await conn.query(`DELETE FROM clients WHERE id = ?`, [id]);

    await conn.commit();
    return result.affectedRows > 0;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
