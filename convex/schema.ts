import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
  
  workspaces: defineTable({
    name:v.string() ,
    userId : v.id("users") ,
    joinCode : v.string(),

  }),
});

export default schema ;