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
  smallint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const userTb = mysqlTable("user", {
  user_id: serial("user_id").primaryKey().autoincrement(),
  display_name: varchar("display_name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  birthday: date("birthday"),
  contact: varchar("contact", { length: 20 }), // Manual input for phone number
  about: text("about"), // Optional, can be NULL
  email: varchar("email", { length: 255 }),
  active: boolean("active").default(true), // Default is active
  blocked: boolean("blocked").default(false), // Default is not blocked
  user_type: int("user_type").notNull(), // 1 = customer, 2 = store/seller/farmer
  date_added: timestamp("date_added").defaultNow().notNull(),
  date_updated: timestamp("date_updated").defaultNow().onUpdateNow().notNull(),
});

export const userAuthTb = mysqlTable("user_auth", {
  auth_id: varchar("auth_id", { length: 200 }).primaryKey(), // Primary key, varchar(100)
  user_id: serial("user_id").references(() => userTb.user_id),
  type_id: int("type_id")
    .notNull()
    .default(sql`1`), // smallint(2), not null, indexed
  auth_email: varchar("auth_email", { length: 70 }).notNull(), // varchar(70), not null
  auth_token: varchar("auth_token", { length: 400 }), // varchar(400), no default value
  auth_username: varchar("auth_username", { length: 30 }).notNull(), // varchar(30), not null
  auth_user_birth_date: date("auth_user_birth_date")
    .notNull()
    .default(sql`1879-01-01`), // date, default 1879-01-0
  date_added: timestamp("date_added")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // timestamp, default CURRENT_TIMESTAMP
  date_updated: timestamp("date_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
export const userImageTb = mysqlTable("user_image", {
  image_id: serial("image_id").primaryKey().autoincrement(), // Primary key, varchar(100)
  user_id: int("user_id").references(() => userTb.user_id),
  image_url: varchar("image_url", { length: 500 }).notNull(), // varchar(500 ), not null
  image_type_id: smallint("image_type_id"), // 1= profile image, 2= gallery, 3=banner
  date_added: timestamp("date_added")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // timestamp, default CURRENT_TIMESTAMP
  date_updated: timestamp("date_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userEmailTb = mysqlTable("user_email", {
  email_id: int("email_id").primaryKey().autoincrement(), // Primary key, int(11)
  user_email: varchar("user_email", { length: 70 }).notNull(), // varchar(70), not null
  date_added: timestamp("date_added")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // timestamp, default CURRENT_TIMESTAMP
  date_updated: timestamp("date_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userPasswordTb = mysqlTable("user_password", {
  pass_id: int("pass_id").primaryKey().autoincrement(), // Primary key,
  user_id: serial("user_id").references(() => userTb.user_id),
  hash_password: varchar("hash_password", { length: 350 }).notNull(), // varchar(70), not null
  is_primary: int("is_primary").notNull().default(1), // is_primary=1 current password,is_primary=2 means old password
  date_added: timestamp("date_added")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // timestamp, default CURRENT_TIMESTAMP
  date_updated: timestamp("date_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const userLoginTb = mysqlTable("user_login", {
  login_id: int("login_id").primaryKey().autoincrement(), // Primary key, int(11)
  user_id: serial("user_id").references(() => userTb.user_id), // varchar(70), not null
  type_id: int("type_id").notNull(), // type_id(1 google 2=email)
  is_signup: int("is_signup").notNull().default(1), // 1=login 2=signup
  date_added: timestamp("date_added")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), // timestamp, default CURRENT_TIMESTAMP
  date_updated: timestamp("date_updated")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
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
  seller_id: int("seller_id").references(() => userTb.user_id),
  unit_type_id: int("unit_type_id").references(
    () => productUnitTb.unit_type_id,
  ),
  price: int("price").notNull(),
  quantity_available: int("quantity_available").notNull(),
  active: boolean("active").notNull().default(true),
  date_added: timestamp("date_added").default(sql`CURRENT_TIMESTAMP`),
  date_updated: timestamp("date_updated").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  ),
});
export const productImagesTb = mysqlTable("product_image", {
  product_id: int("product_id").references(() => productsTb.product_id),
  image: varchar("image", "255").notNull(),
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

  address: text("address").notNull(),
  user_id: int("user_id")
    .references(() => userTb.user_id)
    .notNull(), // Foreign key to the user table
  seller_id: int("seller_id")
    .references(() => userTb.user_id)
    .notNull(), // Foreign key to seller/farmer (user_type = 2)
  total_amount: decimal("total_amount").notNull(), // Total amount in PHP (up to 10 digits, 2 decimal places)
  // is_completed: boolean("is_completed").default(false), // 1 = true, 0 = false (default is false)
  active: boolean("active").default(true), // Order is active by default
  // date_completed: timestamp("date_completed"), // Date order was completed (nullable)
  date_added: timestamp("date_added").defaultNow().notNull(), // Date order was added (automatically set)
  date_updated: timestamp("date_updated").defaultNow().onUpdateNow().notNull(), // Tracks changes and updates automatically
});

export const orderProductsTb = mysqlTable("order_products", {
  order_id: int("order_id")
    .references(() => ordersTb.order_id)
    .notNull(),
  product_id: int("product_id")
    .references(() => productsTb.product_id)
    .notNull(),
  current_price: int("current_price").notNull(),
  quantity: int("quantity").notNull(),
  date_completed: timestamp("date_completed"),
  is_completed: boolean("is_completed").default(false), // 1 = true, 0 = false
  active: boolean("active").notNull().default(true),
  date_added: timestamp("date_added").notNull().defaultNow(),
  date_updated: timestamp("date_updated").notNull().defaultNow().onUpdateNow(),
});
