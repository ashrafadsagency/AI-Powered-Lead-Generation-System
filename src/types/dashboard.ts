export type Business = {
  id: string;
  name: string;
  industry: string;
  website: string;
};

export type Niche = {
  id: string;
  title: string;
  description: string;
  demand: 'High' | 'Medium' | 'Low';
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified';
};
