/** @type { import("drizzle-kit").Config } */
module.exports = {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
      url:  'postgresql://neondb_owner:npg_0HUeEnstdDQ1@ep-long-glade-aef4bwb2-pooler.c-2.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require',
    },
  };