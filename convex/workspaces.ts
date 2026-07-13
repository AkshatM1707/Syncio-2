import { v } from "convex/values";
import { mutation, query } from "./_generated/server";




export const create = mutation({
    args: {
        name: v.string(),
        
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const user = await ctx.db
            .query("users")
            .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }
        const userId = user._id;

        const joinCode= "123456";

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId, 
            joinCode,
        });

        
        return workspaceId;
    },
})
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const getByID = query({
    args: {
        id: v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if(!userId){
            throw new Error("Unauthorized");
        }
        return await ctx.db.get(args.id);
    },
})