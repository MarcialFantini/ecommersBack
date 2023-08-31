import { pool } from "../libs/pg";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const passwordToken = "hola123";

export interface UserInterface {
  name: string;
  is_admin: boolean;
  password: string;
  email: string;
}
export class userService {
  async createUser(user: UserInterface) {
    const pass = await bcrypt.hash(user.password, 10);

    const data = await pool.query(
      `INSERT INTO users(name,isadmin,password,email) VALUES ($1,$2,$3,$4)`,
      [user.name, user.is_admin, pass, user.email]
    );

    return data;
  }

  async userDelete(id: number) {
    const data = await pool.query(`DELETE FROM users WHERE users.id = $1`, [
      id,
    ]);

    return data.rowCount > 0;
  }

  async userLogin(password: string, email: string) {
    const data = await pool.query(`select * from users WHERE email = $1`, [
      email,
    ]);

    if (data.rowCount !== 1) {
      throw new Error("not found USER");
    }

    const person = data.rows[0] as unknown as UserInterface;

    console.log(person);
    const isPasswordOk = await compare(password, person.password);

    if (!isPasswordOk) {
      console.log("error to password");

      throw new Error("failed password");
    }

    const token = jwt.sign(
      { email: person.email, isAdmin: person.is_admin },
      passwordToken
    );

    return { token: token, code: 200 };
  }
}
