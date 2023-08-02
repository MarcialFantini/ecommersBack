import { pool } from "../libs/pg";

export class userService {
  async createUser() {
    const data = await pool.query(
      `INSERT INTO users(name,is_admin,password,email) VALUES ($1,$2,$3,$4)`,
      ["hola", true, "hola", "hola"]
    );
    return data;
  }

  async userDelete(id: number) {
    const data = await pool.query(`DELETE FROM users WHERE users.id = $1`, [
      id,
    ]);

    return data.rowCount > 0;
  }
}
