import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'excludedDirectories',
  title: 'Excluded Directories',
  type: 'document',
  fields: [
    defineField({
      name: 'directoryName',
      title: 'Directory name',
      type: 'string',
    }),
  ],
})
