import { pgTable, serial, varchar, timestamp, text, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  passwordHash: text("password_hash").notNull()
})

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull().unique(),
  
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  
  gold: integer("gold").default(0).notNull(),
  emerald: integer("emerald").default(0).notNull(),

  strength: integer("strength").default(10).notNull(),
  agility: integer("agility").default(10).notNull(),
  endurance: integer("endurance").default(10).notNull(),
  intelligence: integer("intelligence").default(10).notNull(),
  wisdom: integer("wisdom").default(10).notNull(),
  luck: integer("luck").default(10).notNull(),

  energy: integer("energy").default(100).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
});