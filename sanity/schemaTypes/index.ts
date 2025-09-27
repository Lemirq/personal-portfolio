import { type SchemaTypeDefinition } from "sanity";
import About from "../schemas/About";
import Tech from "../schemas/Tech";
import Project from "../schemas/Project";
import blockContent from "../schemas/blockContent";
import ExcludedDirectories from "../schemas/ExcludedDirectories";
import iknow from "../schemas/iknow";
import VisibleProjects from "../schemas/VisibleProjects";
import Client from "../schemas/Client";
import Invoice from "../schemas/Invoice";
import Redirect from "../schemas/Redirect";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    About,
    Tech,
    Project,
    blockContent,
    ExcludedDirectories,
    iknow,
    VisibleProjects,
    Client,
    Invoice,
    Redirect,
  ],
};
