import { defineField, defineType } from "sanity";

const Redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      title: "From path",
      type: "string",
      description: "Path to match, e.g. /go or /r/abc",
      validation: (Rule) =>
        Rule.required()
          .regex(/^\//, { name: "leading-slash", invert: false })
          .error("Path must start with a forward slash /")
          .custom((value) => {
            if (!value) return true;
            // disallow trailing slash except for root
            if (value !== "/" && value.endsWith("/")) {
              return "Remove trailing slash (e.g. use /go, not /go/)";
            }
            return true;
          }),
    }),
    defineField({
      name: "to",
      title: "Destination URL",
      type: "url",
      description: "Absolute or relative URL to redirect to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (308)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export default Redirect;
