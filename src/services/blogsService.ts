import { pool } from "../libs/pg";
import { ServiceTextBlog } from "./textBlogService";

export interface bodyBlogCreator {
  category: string;
  title: string;
  sub_title: string;

  texts: string[];
}

export interface BlogInterface {
  id: number;
  url_image: string;
  category: string;
  title: string;
  sub_title: string;
}

const serviceText = new ServiceTextBlog();

export class blogsService {
  async createBLog(body: bodyBlogCreator, url: string, texts: string[]) {
    try {
      const blog = await pool.query(
        `insert into blogs ( url_image, category, title, sub_title) values ( $1, $2, $3, $4)  RETURNING id;`,
        [url, body.category, body.title, body.sub_title]
      );

      const id = blog.rows[0].id as number;

      const listPromise = texts.map((text) => {
        return pool.query(
          "INSERT INTO blog_text(text_blog,id_blog) VALUES( $1 , $2 );",
          [text, id]
        );
      });

      Promise.all(listPromise);

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

  async getPage(page: number | string) {
    const pageNumber = Number(page) < 0 ? 0 : Number(page);

    const blogGet = await pool.query("SELECT * FROM blogs LIMIT 10 OFFSET $1", [
      pageNumber * 10,
    ]);

    return blogGet.rows;
  }

  async getBlogForId(id: number | string) {
    const idNumber = Number(id);

    const blog = await pool.query("SELECT * FROM blogs WHERE id = $1", [
      idNumber,
    ]);

    return blog.rows[0];
  }

  async getBlogsComplete(page: number) {
    try {
      const limit = page >= 0 ? page * 10 : 0;

      const blogsQuery = await pool.query(
        "SELECT * FROM blogs LIMIT 10 OFFSET $1;",
        [limit]
      );

      const listBlogs = blogsQuery.rows as BlogInterface[];

      const listBlogsWithText = await Promise.all(
        listBlogs.map((item) => {
          return pool.query("SELECT * FROM blog_text WHERE id_blog = $1;", [
            item.id,
          ]);
        })
      );

      const data = await listBlogs.map((blog, index) => {
        return {
          ...blog,
          listText: listBlogsWithText[index].rows,
        };
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getAdminBlogPage(page: number) {
    const pageOffSet = page > 0 ? page * 10 : 0;
    const blogsQuery = await pool.query(
      "SELECT id,category,title,sub_title from blogs LIMIT 10 OFFSET $1;",
      [pageOffSet]
    );

    return blogsQuery.rows;
  }
}
