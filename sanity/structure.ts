import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("About Section")
        .child(S.document().schemaType("about").documentId("about")),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "experience",
        title: "Experience",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["about", "project", "experience"].includes(listItem.getId() || "")
      ),
    ]);
