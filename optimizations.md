### What I found (unused schema bits)

- ExcludedDirectories
  - Entire schema `sanity/schemas/ExcludedDirectories.ts` is never fetched or referenced in app code.
  - Store state `directories` and `setDirectories` in `stores/MainStore.tsx` are also never used.

- Visible Projects
  - Field `heading` on `visible-projects` is defined but never read anywhere. Only `projectOrdering` is used.

- iknow
  - Fields `title` and `img` are not used. UI uses only `className` to render the icon in `components/sections/Bento.tsx`.

- Invoice
  - Field `services[].total` is not used. All totals are computed from `quantity * rate` everywhere (server and client). Queries fetch `total` but UI/logic ignores it.

- Schemas index duplication
  - `sanity/schemas/index.ts` exists but is unused. The studio and app use `sanity/schemaTypes/index.ts`.

- Contact schema file
  - `sanity/schemas/Contact.ts` appears empty and is not imported into any schema index or used.

- Code/schema mismatch
  - `app/resume/route.tsx` queries `*[_type == "resume"]{name,"file": file.asset->url}`, but there is no `resume` schema. Route will return nothing and can break. Either add the schema or remove the route.
  - `app/page.tsx` queries `order` for `project` docs, but `order` is not defined in the `project` schema and the value is not used anyway.

### Concrete optimizations

- Sanity fetches (fewer round-trips, safer types)
  - Collapse ordering + projects into one GROQ query to avoid manual joining:
    - Example: fetch the ordered projects directly with a deref:
      - `*[_type == "visible-projects"][0]{ "projects": projectOrdering[]->{ title, headline, url, videoUrl, invisible, tech, body, _id, mainImage{asset->{_id,url}}, gallery[]{asset->{_id,url}} } }`
  - Remove `order` from the projects query in `app/page.tsx`.
  - Stop selecting `services[].total` in invoice queries since it isn’t used.

- Avoid leaking token to the browser
  - `components/sections/About.tsx` builds image URLs with `imageUrlBuilder(client)`. Because this is a client component, passing the `client` object risks bundling the token.
  - Switch to the existing helper `sanity/lib/image.ts`:
    - `import { urlFor } from '@/sanity/lib/image'` and use `urlFor(about.mainImage).width(1000).height(1000).url()`.

- DRY for video URL embedding
  - The “YouTube URL → embed URL” logic is copy-pasted in at least three places (`Project.tsx` and `components/sections/Projects.tsx` twice). Extract a small util, e.g. `utils/youTubeEmbed.ts` with a single `toEmbedUrl(input: string): string` and reuse it.

- Defensive guards
  - In `app/page.tsx`, if there’s no `visible-projects` doc or it has empty `projectOrdering`, the current `projectOrdering[0].projectOrdering.map(...)` will crash. Add a fallback to `unorderedProjects` or default to `[]`.

- Remove dead code/files
  - Delete `sanity/schemas/index.ts` to avoid confusion with the real schema index at `sanity/schemaTypes/index.ts`.
  - Delete `sanity/schemas/Contact.ts` (empty).
  - Delete `sanity/schemas/ExcludedDirectories.ts` and the `directories` state from the store if you don’t plan to use them.
  - Remove `services[].total` from `sanity/schemas/Invoice.ts` (and from any GROQ selections).
  - Remove `heading` from `sanity/schemas/VisibleProjects.ts` or start using it in UI.
  - Remove `title`/`img` from `sanity/schemas/iknow.ts` or start rendering them (e.g., use `title` as tooltip and `img` as a fallback if `className` is absent).
  - Either add a `resume` schema or remove `app/resume/route.tsx`.

- Minor UI perf/consistency
  - In `Projects.tsx`, replace raw `<img>` with `next/image` for gallery and main image (you’ve already done this elsewhere).
  - Normalize how you render tech badges and details between `Projects.tsx` and `Project.tsx` to avoid duplicated logic.

- Types and robustness
  - Prefer using the generated `sanity.types.ts` types at fetch boundaries to validate fields used by the components.
  - Ensure the global type aliases in `index.d.ts` match what you actually select in GROQ, especially after removing fields like `order` and `services[].total`.

- Feature flags/custom property hygiene
  - If you reintroduce `ExcludedDirectories` or `VisibleProjects.heading`, centralize property names in a const enum-like object and use it in the fewest places possible.

### Quick wins to implement first

- Remove `order` from `app/page.tsx` query.
- Guard `projectOrdering` and add the single deref GROQ for ordered projects.
- Switch `About.tsx` to use `urlFor` helper (no client token).
- Stop selecting `services[].total`; then remove it from the Invoice schema.
- Delete `sanity/schemas/index.ts`, empty `Contact.ts`, unused `ExcludedDirectories.*` schema + store slice.
- Decide on `visible-projects.heading` and `iknow.title/img` (use or remove).
- Fix or remove the `resume` route.
