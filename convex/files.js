import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const uploadFiles = mutation({
  args: {
    file: v.string(),
    shortcode: v.string(),
    organizationId: v.id("organizations"),
    organizationName: v.string(),
  },
  handler: async (
    ctx,
    { file, shortcode, organizationId, organizationName }
  ) => {
    const retrievedOrganization = await ctx.db.get(organizationId);
    const orgId = retrievedOrganization._id;
    // const orgName = retrievedOrganization.name;

    // console.log(file, shortcode, organizationId, organizationName);
    await ctx.db.insert("files", {
      file,
      shortcode,
      organizationId: orgId,
      organizationName,
    });
  },
});

export const getShortcodes = mutation({
  args: { organizationId: v.string("organizationId") },
  handler: async (ctx, { organizationId }) => {
    const shortcodes = await ctx.db
      .query("files")
      .filter((file) => file.eq(file.field("organizationId"), organizationId))
      .collect();
    return shortcodes.map((code) => ({ short_code: code.shortcode }));
  },
});

export const getFiles = mutation({
  args: { organizationId: v.string("organizationId") },
  handler: async (ctx, { organizationId }) => {
    const files = await ctx.db
      .query("files")
      .filter((file) => file.eq(file.field("organizationId"), organizationId))
      .collect();
    console.log(files);
    return files;
  },
});
