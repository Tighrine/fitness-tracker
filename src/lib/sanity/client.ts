import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: "09xvy24p",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

export const client = createClient(config);

// Create admin level client for server-side operations
const adminConfig = {
  ...config,
  token: process.env.SANITY_API_TOKEN, // Ensure this environment variable is set
};

export const adminClient = createClient(adminConfig);

// Create a URL builder for images
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);