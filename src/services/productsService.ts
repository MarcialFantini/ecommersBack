import path from "path";
import { pool } from "../libs/pg";
export interface bodyCreate {
  name: string;
  price: number;
  amount: number;
  description: string;
}

export class productService {
  async create(fileDir: string, body: bodyCreate) {
    try {
      const productID = await pool.query(
        "INSERT INTO products(name,price,amount,description) values ($1,$2,$3,$4)  RETURNING  products.id ",
        [body.name, body.price, body.amount, body.description]
      );

      const id = productID.rows[0].id as number;

      pool.query(
        "INSERT INTO images_products(url_img,id_product) VALUES ($1,$2)",
        [path.normalize(__dirname + "/../../" + fileDir), id]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id: number, body: bodyCreate) {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(body).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    const updateQuery = `UPDATE products SET ${updates.join(
      ", "
    )} WHERE products.id = $${values.length + 1}`;
    values.push(id);

    console.log(updateQuery); // Solo para verificar la consulta generada

    try {
      const result = await pool.query(updateQuery, values);
      console.log(
        `Producto actualizado correctamente: ${result.rowCount} filas afectadas.`
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id: number) {
    try {
      const productImages = await pool.query(
        "DELETE FROM images_products WHERE images_products.id_product = $1",
        [id]
      );

      const productDeleted = await pool.query(
        "DELETE FROM products WHERE products.id = $1",
        [id]
      );
    } catch (error) {
      console.log(error);
    }
    return {
      message: "todo ok",
    };
  }

  async getPage(page: number) {
    try {
      const pageOffSet = page >= 0 ? page * 12 : 0;

      const data = await pool.query(
        "SELECT * FROM products LIMIT 12 OFFSET $1",
        [pageOffSet]
      );

      return data.rows;
    } catch (error) {
      return error;
    }
  }

  async getProductForId(id: number) {
    const data = await pool.query(
      "SELECT * FROM products WHERE products.id = $1",
      [id]
    );

    return data.rows;
  }
}
