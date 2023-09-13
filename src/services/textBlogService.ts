import { pool } from "../libs/pg";

export interface blogTextCreatorInterface {
  text_blog: string;
  id_blog: number;
}

export class ServiceTextBlog {
  async createBlogText(body: blogTextCreatorInterface) {
    try {
      const blogTextCreate = await pool.query(
        "INSERT INTO blog_text(text_blog,id_blog) VALUES ( $1,$2)",
        [body.text_blog, body.id_blog]
      );

      console.log(blogTextCreate);
      return blogTextCreate;
    } catch (error) {
      return error;
    }
  }

  async deleteBlogText(id: number) {
    try {
      const blogTextDeleted = await pool.query(
        "DELETE FROM blog_text WHERE id = $1",
        [id]
      );

      return blogTextDeleted;
    } catch (error) {
      return error;
    }
  }

  async updateBlogText(body: blogTextCreatorInterface, id: number) {
    try {
      const baseQuery = "UPDATE blog_text SET ";
      const valuesForQuery: unknown[] = [];
      const valuesSet: string[] = [];

      console.log(Object.entries(body));

      Object.entries(body).forEach((item, index) => {
        valuesForQuery.push(item[1]);
        valuesSet.push(`${item[0]} = $${index + 1}`);
      });

      const queryComplete =
        baseQuery +
        valuesSet.join(",") +
        ` WHERE id = $${valuesForQuery.length + 1} `;

      await pool.query(queryComplete, [...valuesForQuery, id]);

      return { message: "todo ok" };
    } catch (error) {
      return error;
    }
  }

  async getBlogTexts(id: number | string) {
    try {
      const textBlogs = await pool.query(
        "SELECT id,text_blog FROM blog_text WHERE id_blog = $1",
        [id]
      );

      return textBlogs.rows;
    } catch (error) {
      return error;
    }
  }
}
