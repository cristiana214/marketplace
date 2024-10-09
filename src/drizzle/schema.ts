// drizzle/schema.ts
import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const categoriesTb = mysqlTable("categories", {
  category_id: serial("category_id").primaryKey(),
  name: varchar("name", "255").notNull(),
  url: varchar("url", "255").notNull(),
  description: varchar("description", "255").notNull(),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
export const categoryTypesTb = mysqlTable("category_types", {
  type_id: serial("type_id").primaryKey(),
  category_id: int("category_id").references(() => categoriesTb.category_id),
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
  type_id: int("type_id").references(() => categoryTypesTb.type_id),
  price: int("price").notNull(),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
