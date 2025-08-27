import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
  
  messages: defineTable({
    body: v.string(),
    userId: v.id("users"),
  })
  .index("byUser", ["userId"]),
});