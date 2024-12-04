import { db } from "@/src/lib/db";
import mysql, { Connection, Pool } from "mysql2/promise";
import { NextResponse } from "next/server";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: Pool;

  private constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async Query(query: string) {
    try {
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Database query failed.");
    }
  }

  public async Transaction(query: string) {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();

    try {
      const [insertedIdResult] = await connection.query("SELECT LAST_INSERT_ID() AS id");
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Transaction failed, rolled back:", error);
      throw new Error("Transaction failed.");
    } finally {
      connection.release();
    }
  }
}

export const conn = DatabaseConnection.getInstance();
