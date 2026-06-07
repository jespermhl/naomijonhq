import { vemetric } from "@vemetric/web";
import { env } from "@/env.mjs";

vemetric.init({
    token: env.NEXT_PUBLIC_VEMETRIC_TOKEN,
});