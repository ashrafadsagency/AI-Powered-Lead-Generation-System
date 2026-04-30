import { Business, Lead, Niche } from '../types/dashboard';

export const initialBusinesses: Business[] = [
  { id: '1', name: 'BluePeak Marketing', industry: 'Marketing', website: 'bluepeak.io' },
  { id: '2', name: 'EcoGlow Dental', industry: 'Healthcare', website: 'ecoglowdental.com' },
];

export const niches: Niche[] = [
  { id: '1', title: 'Real Estate', description: 'Listings, prospecting, and branded media assets.', demand: 'High' },
  { id: '2', title: 'Fitness Studio', description: 'Campaigns and lead funnels for local memberships.', demand: 'Medium' },
  { id: '3', title: 'Law Firm', description: 'Authority content and conversion-focused pages.', demand: 'High' },
  { id: '4', title: 'E-commerce', description: 'Product storytelling and paid ad creatives.', demand: 'High' },
];

export const leads: Lead[] = [
  { id: 'LD-1001', name: 'Olivia Stone', email: 'olivia@acme.com', status: 'New' },
  { id: 'LD-1002', name: 'Liam Carter', email: 'liam@horizon.com', status: 'Contacted' },
  { id: 'LD-1003', name: 'Noah Mills', email: 'noah@northbridge.com', status: 'Qualified' },
];
