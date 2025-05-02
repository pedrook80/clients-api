import pool from '../../../common/db.js';

export async function showClientssUseCase({ ddd, namePart }) {
  const conn = await pool.getConnection();
  try {
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

    const [rows] = await conn.query(baseQuery, params);

    // transforma string de phones/emails em array
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
