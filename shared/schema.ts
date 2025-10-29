import { pgTable, text, timestamp, uuid, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const therapists = pgTable("therapists", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  bio: text("bio").notNull(),
  gender: text("gender").notNull(), // 'male', 'female', 'non-binary', 'prefer-not-to-say'
  experienceYears: integer("experience_years").notNull(),
  rating: real("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  virtualOffered: boolean("virtual_offered").notNull().default(true),
  inPersonOffered: boolean("in_person_offered").notNull().default(false),
  acceptsNewClients: boolean("accepts_new_clients").notNull().default(true),
  approachStyle: text("approach_style").notNull(), // 'exploratory', 'skills-based', 'balanced'
  focusOrientation: text("focus_orientation").notNull(), // 'current-problems', 'past-understanding', 'flexible'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const therapistSpecializations = pgTable("therapist_specializations", {
  id: uuid("id").primaryKey().defaultRandom(),
  therapistId: uuid("therapist_id").notNull().references(() => therapists.id, { onDelete: 'cascade' }),
  concernTag: text("concern_tag").notNull(), // 'anxiety', 'depression', 'trauma', etc.
});

export const therapistAvailability = pgTable("therapist_availability", {
  id: uuid("id").primaryKey().defaultRandom(),
  therapistId: uuid("therapist_id").notNull().references(() => therapists.id, { onDelete: 'cascade' }),
  availabilityBlock: text("availability_block").notNull(), // 'morning', 'afternoon', 'evening', 'flexible'
});

export const matchingResponses = pgTable("matching_responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }),
  priorTherapy: text("prior_therapy"), // 'yes-helpful', 'yes-not-helpful', 'no'
  approachPreference: text("approach_preference"), // 'exploratory', 'skills-based', 'balanced'
  focusPreference: text("focus_preference"), // 'current-problems', 'past-understanding', 'unsure'
  genderPreference: text("gender_preference"), // 'male', 'female', 'non-binary', 'no-preference'
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const matchingSessionPreferences = pgTable("matching_session_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchingResponseId: uuid("matching_response_id").notNull().references(() => matchingResponses.id, { onDelete: 'cascade' }),
  sessionType: text("session_type").notNull(), // 'in-person', 'virtual', 'either'
});

export const matchingAvailabilityPreferences = pgTable("matching_availability_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchingResponseId: uuid("matching_response_id").notNull().references(() => matchingResponses.id, { onDelete: 'cascade' }),
  availabilityBlock: text("availability_block").notNull(), // 'morning', 'afternoon', 'evening', 'flexible'
});

export const matchingConcernPreferences = pgTable("matching_concern_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchingResponseId: uuid("matching_response_id").notNull().references(() => matchingResponses.id, { onDelete: 'cascade' }),
  concernTag: text("concern_tag").notNull(), // 'anxiety', 'depression', 'trauma', etc.
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertTherapistSchema = createInsertSchema(therapists);
export const selectTherapistSchema = createSelectSchema(therapists);
export const insertTherapistSpecializationSchema = createInsertSchema(therapistSpecializations);
export const selectTherapistSpecializationSchema = createSelectSchema(therapistSpecializations);
export const insertTherapistAvailabilitySchema = createInsertSchema(therapistAvailability);
export const selectTherapistAvailabilitySchema = createSelectSchema(therapistAvailability);
export const insertMatchingResponseSchema = createInsertSchema(matchingResponses);
export const selectMatchingResponseSchema = createSelectSchema(matchingResponses);

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Therapist = z.infer<typeof selectTherapistSchema>;
export type InsertTherapist = z.infer<typeof insertTherapistSchema>;
export type TherapistSpecialization = z.infer<typeof selectTherapistSpecializationSchema>;
export type TherapistAvailability = z.infer<typeof selectTherapistAvailabilitySchema>;
export type MatchingResponse = z.infer<typeof selectMatchingResponseSchema>;
