import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Visible Projects")
        .child(
          S.document()
            .schemaType("visible-projects")
            .documentId("1c653656-be5f-4e44-b7e6-2b250ffaa339")
        ),
      S.listItem()
        .title("About Section")
        .child(S.document().schemaType("about").documentId("about")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["about", "visible-projects"].includes(listItem.getId() || "")
      ),
    ]);
