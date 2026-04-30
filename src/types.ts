/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum NicheStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Niche {
  id: string;
  nicheName: string;
  category: string;
  icon: string;
  description: string;
  targetCustomers: string;
  servicesOffered: string[];
  commonProblems: string[];
  offerIdeas: string[];
  googleAdsHeadlines: string[];
  googleAdsDescriptions: string[];
  metaAdsTexts: string[];
  whatsappTemplates: string[];
  landingPageSections: string[];
  instagramPostIdeas: string[];
  reelScriptIdeas: string[];
  imagePromptTemplates: string[];
  proposalPoints: string[];
  followUpMessages: string[];
  leadFormQuestions: string[];
  status: NicheStatus;
  createdAt: number;
  updatedAt: number;
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  website?: string;
  targetAudience?: string;
  usp?: string;
  contactNumber?: string;
  location?: string;
  nicheId?: string;
}

export interface GeneratedAsset {
  id: string;
  businessId: string;
  nicheId?: string;
  assets: {
    headline: string;
    landingPage: string;
    googleAds: string;
    metaAds: string;
    whatsapp: string;
    instagram: string;
    reelScript: string;
    imagePrompt: string;
    proposal: string;
    followUp: string;
    leadForm?: string;
  };
  createdAt: number;
}

export type View = 'dashboard' | 'generator' | 'clients' | 'niches' | 'admin-niches' | 'projects' | 'tasks';
