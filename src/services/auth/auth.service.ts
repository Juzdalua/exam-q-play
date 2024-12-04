import { Count } from "@/src/interfaces/Types";
import { conn } from "@/src/utils/Connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class AuthService {
  static async createAccount(email: string, hashedPassword: string): Promise<number> {
    const connection = await conn.getPool().getConnection();
    try {
      await connection.beginTransaction();

      const [isExistEmail] = await connection.query<RowDataPacket[]>(
        `
          SELECT COUNT(id) as cnt FROM account WHERE email = ?
        `,
        [email]
      );
      if ((isExistEmail[0] as Count).count > 0) {
        await connection.rollback();
        return -1;
      }

      const [insert] = await connection.query<ResultSetHeader>(
        `
        INSERT INTO account (email, password) VALUES (?, ?)
      `,
        [email, hashedPassword]
      );
      if (insert.affectedRows == 0) {
        await connection.rollback();
        return -2;
      }

      await connection.commit();
      return insert.insertId;
    } catch (error) {
      await connection.rollback();
      console.error("Transaction failed, rolled back:", error);
      throw new Error("Transaction failed.");
    } finally {
      connection.release();
    }
  }

  static async GetAccountByEmail(email:string):Promise<any>{
    const [account] = await conn.getPool().query<RowDataPacket[]>(`SELECT id, email, password FROM account WHERE email = ?`, [email]);
    return account.length > 0 ? account[0] : null;
  }
}
