import pool from '../../../common/db.js';

export async function showClientssUseCase({ ddd, namePart, page = 1, limit = 10 }) {
  const conn = await pool.getConnection();
  try {
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT c.id, c.cpf, c.name,
             GROUP_CONCAT(DISTINCT p.phone) AS phones,
             GROUP_CONCAT(DISTINCT e.email) AS emails
      FROM clients c
      LEFT JOIN phones p ON c.id = p.client_id
      LEFT JOIN emails e ON c.id = e.client_id
    `;

    const where = [];
    const params = [];

    if (ddd) {
      where.push(`p.phone LIKE ?`);
      params.push(`${ddd}%`);
    }

    if (namePart) {
      where.push(`c.name LIKE ?`);
      params.push(`%${namePart}%`);
    }

    if (where.length) {
      baseQuery += ' WHERE ' + where.join(' AND ');
    }

    baseQuery += ' GROUP BY c.id';
    baseQuery += ' LIMIT ? OFFSET ?';

    params.push(Number(limit), Number(offset));

    const [rows] = await conn.query(baseQuery, params);

    return rows.map((row) => ({
      id: row.id,
      cpf: row.cpf,
      name: row.name,
      phones: row.phones ? row.phones.split(',') : [],
      emails: row.emails ? row.emails.split(',') : [],
    }));
  } finally {
    conn.release();
  }
}
