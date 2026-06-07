import { type env } from "./env.mjs";

type Env = Awaited<ReturnType<typeof env>>;

declare global {
    namespace NodeJS {
        type ProcessEnv = Env;
    }
}
