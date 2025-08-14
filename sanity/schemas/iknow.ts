import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'iknow',
  title: 'I Know',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'img',
      title: 'Image URL',
      type: 'string',
    }),
    defineField({
      name: 'className',
      title: 'Class Name',
      type: 'string',
    }),
  ],
})
