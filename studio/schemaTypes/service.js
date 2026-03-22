export default {
  name: 'service',
  title: 'Service Offering',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'FontAwesome Icon Class',
      type: 'string',
      description: 'e.g., "fas fa-briefcase"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Key Features / Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Determines the order array rendered on the frontend. Lower numbers appear first.',
      initialValue: 10,
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}
