import db from '../../../common/db.js';

export async function createClientsUseCase({ cpf, name, phones, emails }) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [clientResult] = await conn.execute(
      'INSERT INTO clients (cpf, name) VALUES (?, ?)',
      [cpf, name]
    );

    const clientId = clientResult.insertId;

    if (phones?.length) {
      for (const phone of phones) {
        await conn.execute(
          'INSERT INTO client_phones (client_id, phone) VALUES (?, ?)',
          [clientId, phone]
        );
      }
    }

    if (emails?.length) {
      for (const email of emails) {
        await conn.execute(
          'INSERT INTO client_emails (client_id, email) VALUES (?, ?)',
          [clientId, email]
        );
      }
    }

    await conn.commit();
    return { clientId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
