import { pool } from "../libs/pg";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const passwordToken = "hola123";

export interface UserInterface {
  id: number;
  name: string;
  is_admin: boolean;
  password: string;
  email: string;
}

interface bodyUserCreator {
  name: string;
  is_admin: boolean;
  password: string;
  email: string;
}
export class userService {
  async createUser(user: bodyUserCreator) {
    const pass = await bcrypt.hash(user.password, 10);

    const data = await pool.query(
      `INSERT INTO users(name,is_admin,password,email) VALUES ($1,$2,$3,$4)`,
      [user.name, !!user.is_admin, pass, user.email]
    );

    return { message: "created user", code: 201 };
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
      { email: person.email, isAdmin: person.is_admin, idUser: person.id },
      passwordToken
    );

    return { token: token, code: 200, isAdmin: person.is_admin };
  }
}
