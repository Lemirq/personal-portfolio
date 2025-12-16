import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Base")
    .items([

      S.listItem()
        .title("About Section")
        .child(S.document().schemaType("about").documentId("about")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["about"].includes(listItem.getId() || "")
      ),
    ]);
