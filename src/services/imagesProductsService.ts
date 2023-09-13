import { pool } from "../libs/pg";
import fs from "fs";

export class ImagesProduct {
  async getImageProduct(idProduct: number) {
    const product = await pool.query(
      "SELECT url_img FROM images_products WHERE id_product = $1",
      [idProduct]
    );

    if (!product.rowCount) {
      throw new Error("Imagen no encontrada");
    }

    const imageUrl = product.rows[0].url_img as string;

    if (!fs.existsSync(imageUrl)) {
      throw new Error("La imagen no existe en la ubicación especificada");
    }

    return imageUrl;
  }
}
