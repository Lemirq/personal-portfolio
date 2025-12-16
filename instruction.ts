import { createClient } from "@sanity/client";
import { token } from "./sanity/env";
export const client = createClient({
    projectId: 'zvfxtzrz',
    dataset: 'production',
    apiVersion: 'vX',
    token: token
})

