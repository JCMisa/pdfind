import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").unique().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  imageUrl: varchar("imageUrl"),
  createdAt: varchar("createdAt"),
});
