import { pool } from "../libs/pg";

export interface bodyBlogCreator {
  category: string;
  title: string;
  sub_title: string;
}
export class blogsService {
  async createBLog(body: bodyBlogCreator, url: string) {
    try {
      const blog = await pool.query(
        "insert into blogs ( url_image, category, title, sub_title) values ( $1, $2, $3, $4)",
        [url, body.category, body.title, body.sub_title]
      );
      return { message: "todo ok" };
    } catch (error) {
      return { message: error };
    }
  }

  async delateBlog(id: number) {
    try {
      const blogText = await pool.query(
        "DELETE FROM blog_text WHERE id_blog = $1",
        [id]
      );
      const blog = await pool.query("DELETE FROM blogs WHERE blogs.id = $1", [
        id,
      ]);

      return {
        message: "todo ok",
      };
    } catch (error) {
      return {
        message: "todo mal",
        error,
      };
    }
  }

  async updateBlog(id: number, body: bodyBlogCreator) {
    try {
      const baseQuery = "UPDATE blogs SET ";
      const valuesSet: string[] = [];
      const values: any[] = [];

      Object.entries(body).forEach((item, index) => {
        valuesSet.push(`${item[0]}=$${index + 1}`);
        values.push(item[1]);
      });

      values.push(id);

      const queryComplete = `${baseQuery} ${valuesSet} WHERE id = $${values.length}`;

      const blogUpdate = await pool.query(queryComplete, values);

      return { message: "todo ok" };
    } catch (error) {
      console.log(error);
    }
  }
}
