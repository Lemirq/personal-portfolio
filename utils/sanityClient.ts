// sanityClient.js
import { createClient } from 'next-sanity';

const client = createClient({
	projectId: 'zvfxtzrz',
	dataset: 'production',
	useCdn: true, // Enable the Content Delivery Network for faster responses
	apiVersion: '2024-07-24', // use a UTC date string
});

export default client;
