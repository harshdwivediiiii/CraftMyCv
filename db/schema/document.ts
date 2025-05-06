import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { personalInfoTable, personalInfoTableSchema } from "./personal-info";
import { experienceTable, experienceTableSchema } from "./experience";
import { educationTable, educationTableSchema } from "./education";
import { skillsTable, skillsTableSchema } from "./skills";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enum definition
export const statusEnum = pgEnum("status", ["archived", "private", "public"]);

// Document table definition
export const documentTable = pgTable("document", {
  id: serial("id").notNull().primaryKey(),
  documentId: varchar("document_id").unique().notNull(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  themeColor: varchar("theme_color", { length: 255 }).notNull().default("#7c3aed"),
  thumbnail: text("thumbnail"),
  currentPosition: integer("current_position").notNull().default(1),
  status: statusEnum("status").notNull().default("private"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

// Table relations
export const documentRelations = relations(documentTable, ({ one, many }) => ({
  personalInfo: one(personalInfoTable),
  experiences: many(experienceTable),
  educations: many(educationTable),
  skills: many(skillsTable),
}));

// Zod schema for inserting documents
export const createDocumentTableSchema = createInsertSchema(documentTable, {
  title: () => z.string().min(1),
  themeColor: () => z.string().optional(),
  thumbnail: () => z.string().optional(),
  currentPosition: () => z.number().optional(),
}).pick({
  title: true,
  status: true,
  summary: true,
  themeColor: true,
  thumbnail: true,
  currentPosition: true,
});

// Zod schema for updating documents
export const updateCombinedSchema = z.object({
  title: createDocumentTableSchema.shape.title.optional(),
  status: createDocumentTableSchema.shape.status.optional(),
  thumbnail: createDocumentTableSchema.shape.thumbnail.optional(),
  summary: createDocumentTableSchema.shape.summary.optional(),
  themeColor: createDocumentTableSchema.shape.themeColor.optional(),
  currentPosition: createDocumentTableSchema.shape.currentPosition.optional(),
  personalInfo: personalInfoTableSchema.optional(),
  education: z.array(educationTableSchema).optional(),
  experience: z.array(experienceTableSchema).optional(),
  skills: z.array(skillsTableSchema).optional(),
});

// Types
export type DocumentSchema = z.infer<typeof createDocumentTableSchema>;
export type UpdateDocumentSchema = z.infer<typeof updateCombinedSchema>;
