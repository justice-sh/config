import * as path from "path";
import * as dotenv from "dotenv";
import { EnvData } from "./types/env.type";
import { envSchema } from "./schema/env.schema";
import { ConfigData } from "./types/config.type";
import { ExactPathForValue } from "./types/util";
import { fromZodError } from "zod-validation-error";

dotenv.config();

let loadedEnv: EnvData;
let transformedData: ConfigData;

export class ConfigService {
  private logger = console;

  constructor() {
    if (loadedEnv) return;
    loadedEnv = this.loadAndValidate();
  }

  get<R, K extends ExactPathForValue<ConfigData, R>>(selector: (env: ConfigData) => R): R {
    const data = this.transform();
    return selector(data);
  }

  private transform(): ConfigData {
    if (transformedData) return transformedData;

    transformedData = { ...loadedEnv };

    return transformedData;
  }

  private loadAndValidate() {
    let result = envSchema().safeParse(process.env);

    if (!result.success) {
      const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
      dotenv.config({ path: envFilePath, debug: true });

      this.logger.log(`✅ Loaded config for: ${process.env.NODE_ENV}, from ${envFilePath}`);

      result = envSchema().safeParse(process.env);
    }

    if (result.error) throw new Error(fromZodError(result.error).message);

    return result.data;
  }
}
