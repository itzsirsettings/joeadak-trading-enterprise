import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration extracted directly from the user's /studio installation (sanity.cli.js)
export const client = createClient({
  projectId: 'juao60q3',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to query the latest API version
})

// Helper function to easily resolve Sanity image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
