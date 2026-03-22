export default {
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Corporate Events', value: 'corporate'},
          {title: 'Community Projects', value: 'community'},
          {title: 'Business Solutions', value: 'business'},
          {title: 'Consultancy', value: 'consultancy'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'client',
      title: 'Client Name (Optional)',
      type: 'string',
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
