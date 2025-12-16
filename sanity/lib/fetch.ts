import { type ClientConfig, type QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDev = process.env.NODE_ENV === "development";

  return client.fetch(query, params, {
    ...(isDev && {
      token: process.env.SANITY_API_TOKEN,
      perspective: "previewDrafts",
    }),
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags,
    },
  });
}
