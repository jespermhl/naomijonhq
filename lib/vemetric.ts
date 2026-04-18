import { Vemetric } from "@vemetric/node";

export const vemetric = new Vemetric({
    token: process.env.NEXT_PUBLIC_VEMETRIC_TOKEN!,
});