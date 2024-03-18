import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  organizations: defineTable({
    address: v.string(),
    description: v.string(),
    email: v.string(),
    name: v.string(),
    password: v.string(),
  }),
  files: defineTable({
    file: v.string(),
    organizationId: v.id("organizations"),
    organizationName: v.string(),
    shortcode: v.string(),
  }),
  locations: defineTable({
    name: v.string(),
    numbers: v.string(),
  }),
});
