import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrganization = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    address: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { name, email, password, address, description }) => {
    console.log(email, name);
    const existingEmail = await ctx.db
      .query("organizations")
      .filter((org) => org.eq(org.field("email"), email))
      .collect();

    const existingName = await ctx.db
      .query("organizations")
      .filter((org) => org.eq(org.field("name"), name))
      .collect();

    if (existingEmail.length > 0 || existingName.length > 0) {
      alert("Organization with this email or name already exists");
    }
    await ctx.db.insert("organizations", {
      name,
      email,
      password,
      address,
      description,
    });
  },
});
