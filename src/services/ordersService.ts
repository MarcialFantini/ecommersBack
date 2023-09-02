import { pool } from "../libs/pg";

export interface Order {
  id: number;
  id_usuario: number;
  id_product: number;
  amount: number;
}

export class OrdersService {
  async createOrder(idProduct: number, amount: number, idUser: number) {
    const queryAmount = await pool.query(
      "SELECT amount FROM products WHERE id = $1",
      [idProduct]
    );

    const amountBeforeToShopInStock = (await queryAmount.rows[0]
      .amount) as number;

    if (amountBeforeToShopInStock < amount) {
      throw new Error("no amount necessary in order");
    }

    await pool.query(
      `INSERT INTO orders(id_usuario,id_product,amount) VALUES ($1,$2,$3) `,

      [idUser, idProduct, amount]
    );

    await pool.query(` UPDATE products SET amount = $2 WHERE id = $1;`, [
      idProduct,
      amountBeforeToShopInStock - amount,
    ]);

    return {
      message: "Created order",
    };
  }

  async updateOrder(orderId: number, updates: Order) {
    const client = await pool.connect();

    try {
      const updateColumns = Object.keys(updates);
      const updateValues = Object.values(updates);
      const updateParams = updateColumns
        .map((col, index) => `${col} = $${index + 2}`)
        .join(", ");

      const query = `
        UPDATE orders
        SET ${updateParams}
        WHERE id = $1;
      `;

      const queryParams = [orderId, ...updateValues];

      const result = await client.query(query, queryParams);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
  async deleteOrder(orderId: number) {
    try {
      const query = `
        DELETE FROM orders
        WHERE id = $1;
      `;

      const result = await pool.query(query, [orderId]);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
  async getOrderById(orderId: number) {
    try {
      const query = `
        SELECT * FROM orders
        WHERE id = $1;
      `;

      const result = await pool.query(query, [orderId]);
      return result.rows[0]; // Retorna la orden encontrada o undefined si no existe
    } catch (error) {
      throw error;
    }
  }

  // Función para obtener una página de órdenes paginadas
  async getOrdersByPage(page: number, pageSize: number) {
    try {
      const offset = (page - 1) * pageSize;
      const query = `
        SELECT * FROM orders
        LIMIT $1
        OFFSET $2;
      `;

      const result = await pool.query(query, [pageSize, offset]);
      return result.rows; // Retorna un arreglo de órdenes para la página especificada
    } catch (error) {
      throw error;
    }
  }
}
