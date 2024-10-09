// drizzle/schema.ts
import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const categoryTypesTb = mysqlTable("category_types", {
  category_id: serial("category_id").primaryKey(),
  type_id: serial("type_id").primaryKey(),
  name: varchar("name", "255").notNull(),
  url: varchar("url", "255").notNull(),
  description: varchar("description", "255").notNull(),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});

export const productsTb = mysqlTable("products", {
  product_id: serial("product_id").primaryKey(),
  name: varchar("name", "255").notNull(),
  description: varchar("description", "255").notNull(),
  category_id: int("category_id").references(() => categoryTypesTb.category_id),
  price: int("price").notNull(),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
