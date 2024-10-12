// drizzle/schema.ts
import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  text,
  boolean,
  date,
  decimal,
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
export const productUnitTb = mysqlTable("product_unit", {
  unit_type_id: serial("unit_type_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  display_name: varchar("display_name", { length: 100 }).default(""), // Allows NULL values
});

export const productsTb = mysqlTable("products", {
  product_id: serial("product_id").primaryKey(),
  name: varchar("name", "255").notNull(),
  // url: varchar("url", "255").notNull(),
  description: varchar("description", "255").notNull(),
  type_id: int("type_id").references(() => categoryTypesTb.type_id),
  unit_type_id: int("unit_type_id").references(
    () => productUnitTb.unit_type_id,
  ),
  price: int("price").notNull(),
  quantity_available: int("quantity_available").notNull(),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
export const productImagesTb = mysqlTable("product_image", {
  product_id: int("product_id").references(() => productsTb.product_id),
  image: varchar("image", "255").notNull(),
});

export const userTb = mysqlTable("user", {
  user_id: serial("user_id").primaryKey(),
  display_name: varchar("display_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  birthday: date("birthday").notNull(),
  contact: varchar("contact", { length: 20 }).notNull(), // Manual input for phone number
  about: text("about"), // Optional, can be NULL
  email: varchar("email", { length: 255 }).notNull(),
  active: boolean("active").default(true), // Default is active
  blocked: boolean("blocked").default(false), // Default is not blocked
  user_type: int("user_type").notNull(), // 1 = customer, 2 = store/seller/farmer
  date_added: timestamp("date_added").defaultNow().notNull(),
  date_updated: timestamp("date_updated").defaultNow().onUpdateNow().notNull(),
});

export const userAddressesTb = mysqlTable("user_addresses", {
  address_id: serial("address_id").primaryKey(),
  user_id: int("user_id")
    .references(() => userTb.user_id)
    .notNull(), // Foreign key to the user table
  street_address: varchar("street_address", { length: 255 }).notNull(), // Street address (max length 255)
  city: varchar("city", { length: 100 }).notNull(), // City (max length 100)
  state: varchar("state", { length: 100 }).notNull(), // State/Province (max length 100)
  zip_code: varchar("zip_code", { length: 20 }).notNull(), // Zip code (max length 20)
  country: varchar("country", { length: 100 }).notNull(), // Country (max length 100)
  date_added: timestamp("date_added").defaultNow().notNull(), // Timestamp when the address was added
  date_updated: timestamp("date_updated").defaultNow().onUpdateNow().notNull(), // Automatically updated when the address is modified
});

export const ordersTb = mysqlTable("orders", {
  order_id: serial("order_id").primaryKey(),
  message_for_seller: text("message_for_seller").default(""), // Message for seller (optional, default empty string)
  current_status: text("current_status").notNull(), // Current status of the order
  current_status_comments: text("current_status_comments").default(""), // Comments on current status (optional)
  address_id: int("address_id")
    .references(() => userAddressesTb.address_id)
    .notNull(), // Foreign key to user's address table
  user_id: int("seller_id")
    .references(() => userTb.user_id)
    .notNull(), // Foreign key to the user table
  seller_id: int("seller_id")
    .references(() => userTb.user_id)
    .notNull(), // Foreign key to seller/farmer (user_type = 2)
  total_amount: decimal("total_amount").notNull(), // Total amount in PHP (up to 10 digits, 2 decimal places)
  is_completed: boolean("is_completed").default(false), // 1 = true, 0 = false (default is false)
  active: boolean("active").default(true), // Order is active by default
  date_completed: timestamp("date_completed"), // Date order was completed (nullable)
  date_added: timestamp("date_added").defaultNow().notNull(), // Date order was added (automatically set)
  date_updated: timestamp("date_updated").defaultNow().onUpdateNow().notNull(), // Tracks changes and updates automatically
});
