const cors = require("cors");
const { env } = require("./env");

const origins = env.UI_URL.includes(',') 
  ? env.UI_URL.split(',').map(url => url.trim())
  : [env.UI_URL];

const corsPolicy = cors({
  origin: env.UI_URL,
  method: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Accept", "Origin", "X-CSRF-TOKEN"],
  credentials: true,
});

module.exports = { corsPolicy };
