import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const getUserId = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  const user = await ctx.db
    .query("users")
    .withIndex("byExternalId", (q: any) => q.eq("externalId", identity.subject))
    .unique();
  return user ? user._id : null;
};

export const get = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) return [];

    const data = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    const members = [];
    for (const member of data) {
      const user = await ctx.db.get(member.userId);
      if (user) {
        members.push({
          ...member,
          user,
        });
      }
    }

    return members;
  },
});

export const getCurrent = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    return member;
  },
});

export const getById = query({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const member = await ctx.db.get(args.id);
    if (!member) return null;

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember) return null;

    return member;
  },
});

export const updateRole = mutation({
  args: {
    id: v.id("members"),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    const memberToUpdate = await ctx.db.get(args.id);
    if (!memberToUpdate) throw new Error("Member not found");

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", memberToUpdate.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember || currentMember.role !== "admin") {
      throw new Error("Unauthorized");
    }

    if (currentMember._id === args.id) {
      throw new Error("Cannot change your own role");
    }

    await ctx.db.patch(args.id, { role: args.role });
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    const memberToRemove = await ctx.db.get(args.id);
    if (!memberToRemove) throw new Error("Member not found");

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", memberToRemove.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!currentMember || currentMember.role !== "admin") {
      throw new Error("Unauthorized");
    }

    if (currentMember._id === args.id) {
      throw new Error("Cannot remove yourself, use leave instead");
    }

    // Would typically clean up related messages/channels here
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const leave = mutation({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) throw new Error("Not a member");

    if (member.role === "admin") {
      const admins = await ctx.db
        .query("members")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
        .filter((q) => q.eq(q.field("role"), "admin"))
        .collect();
      if (admins.length === 1) {
        throw new Error("Cannot leave as the only admin");
      }
    }

    await ctx.db.delete(member._id);
    return member._id;
  },
});
