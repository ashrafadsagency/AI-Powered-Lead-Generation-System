import { Niche, BusinessProfile, GeneratedAsset } from '../types';
import { INITIAL_NICHES } from '../constants/initialNiches';

const KEYS = {
  NICHES: 'brandup_niches',
  BUSINESSES: 'brandup_businesses',
  ASSETS: 'brandup_assets',
};

export const storage = {
  getNiches: (): Niche[] => {
    const saved = localStorage.getItem(KEYS.NICHES);
    if (!saved) {
      localStorage.setItem(KEYS.NICHES, JSON.stringify(INITIAL_NICHES));
      return INITIAL_NICHES;
    }
    return JSON.parse(saved);
  },
  saveNiches: (niches: Niche[]) => {
    localStorage.setItem(KEYS.NICHES, JSON.stringify(niches));
  },
  getBusinesses: (): BusinessProfile[] => {
    const saved = localStorage.getItem(KEYS.BUSINESSES);
    return saved ? JSON.parse(saved) : [];
  },
  saveBusinesses: (businesses: BusinessProfile[]) => {
    localStorage.setItem(KEYS.BUSINESSES, JSON.stringify(businesses));
  },
  getAssets: (): GeneratedAsset[] => {
    const saved = localStorage.getItem(KEYS.ASSETS);
    return saved ? JSON.parse(saved) : [];
  },
  saveAssets: (assets: GeneratedAsset[]) => {
    localStorage.setItem(KEYS.ASSETS, JSON.stringify(assets));
  },
};
