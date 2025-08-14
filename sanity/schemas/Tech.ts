import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tech',
  title: 'Project Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'techName',
      title: 'Technology',
      type: 'string',
    }),
  ],
})
