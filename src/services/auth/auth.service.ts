import { Account } from "@/src/interfaces/auth/account.dto";
import { Guest, GuestSide } from "@/src/interfaces/auth/guest.dto";
import { Count } from "@/src/interfaces/Types";
import { conn } from "@/src/utils/Connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class AuthService {
  /*-----------------------------------
    Account
  -----------------------------------*/
  static async createAccount(email: string, hashedPassword: string): Promise<number> {
    const connection = await conn.getPool().getConnection();
    try {
      await connection.beginTransaction();

      const [isExistEmail] = await connection.query<RowDataPacket[]>(
        `
          SELECT COUNT(id) as count FROM account WHERE email = ?
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
      return -2;
    } finally {
      connection.release();
    }
  }

  static async GetAccountByEmail(email: string): Promise<Account> {
    const [account] = await conn.getPool().query<RowDataPacket[]>(`SELECT id, email, password FROM account WHERE email = ?`, [email]);
    return account.length > 0 ? (account[0] as Account) : null;
  }

  /*-----------------------------------
    Guest
  -----------------------------------*/
  static async GetGuestByNameNSide(name: string, side: GuestSide): Promise<Guest> {
    const [guest] = await conn.getPool().query<RowDataPacket[]>(`SELECT id, name, side FROM guest WHERE name = ? and side = ?`, [name, side]);
    return guest.length > 0 ? (guest[0] as Guest) : null;
  }

  static async CreateGuest(name: string, side: GuestSide): Promise<Guest> {
    const connection = await conn.getPool().getConnection();
    try {
      await connection.beginTransaction();

      const [insert] = await connection.query<ResultSetHeader>(
        `
        INSERT INTO guest (name, side) VALUES (?, ?)
      `,
        [name, side]
      );
      if (insert.affectedRows == 0) {
        await connection.rollback();
        return null;
      }

      const [guest] = await connection.query<RowDataPacket[]>(
        `
          SELECT id, name, side FROM guest WHERE id = ?
        `,
        [insert.insertId]
      );

      await connection.commit();
      return guest[0] as Guest;
    } catch (error) {
      await connection.rollback();
      console.error("Transaction failed, rolled back:", error);
      return null;
    } finally {
      connection.release();
    }
  }
}
