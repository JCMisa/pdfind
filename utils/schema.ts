import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").unique().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").unique().notNull(),
  imageUrl: varchar("imageUrl"),
  createdAt: varchar("createdAt"),
});

export const Note = pgTable("note", {
  id: serial("id").primaryKey(),
  noteId: varchar("noteId").unique().notNull(),
  userId: varchar("userId")
    .notNull()
    .references(() => User.userId, { onDelete: "cascade" }),
  pdfTitle: varchar("pdfTitle").notNull(),
  pdfUrl: varchar("pdfUrl").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});

// create relations
export const UserRelations = relations(User, ({ many }) => ({
  Note: many(Note),
}));

export const NoteRelations = relations(Note, ({ one }) => ({
  User: one(User, {
    fields: [Note.userId],
    references: [User.userId],
  }),
}));
