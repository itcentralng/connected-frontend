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
      throw new Error("Organization with this email or name already exists");
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

export const getOrganizations = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, { email, password }) => {
    // Query the database to retrieve the organization based on the provided email
    const organizations = await ctx.db
      .query("organizations")
      .filter((org) => org.eq(org.field("email"), email))
      .collect();

    if (organizations.length === 0) {
      throw new Error("Organization not found");
    }

    const organization = organizations[0];
    if (organization.password === password) {
      return organization; // Return organization information if credentials are valid
    } else {
      throw new Error("Invalid email or password"); // Throw error if credentials are invalid
    }
  },
});
