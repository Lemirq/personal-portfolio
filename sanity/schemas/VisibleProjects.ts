import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'visible-projects',
  title: 'Visible Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      title: 'Project ordering',
      name: 'projectOrdering',
      type: 'array',
      validation: (rule) => rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
    }),
  ],
})
