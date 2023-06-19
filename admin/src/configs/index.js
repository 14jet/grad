import developmentConfig from "./development";
import productionConfig from "./production";

let config = developmentConfig;

if (process.env.NODE_ENV === "production") {
  config = productionConfig;
}

export default config;
