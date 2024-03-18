import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createLocations = mutation({
  args: {
    name: v.string(),
    numbers: v.string(),
  },
  handler: async (ctx, { name, numbers }) => {
    console.log(name, numbers);

    await ctx.db.insert("locations", {
      name,
      numbers,
    });
  },
});

export const getLocations = query({
  args: {},
  handler: async (ctx) => {
    const locations = await ctx.db.query("locations").collect();
    console.log(locations);
    return locations;
  },
});
