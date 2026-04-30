import { GoogleGenerativeAI } from "@google/generative-ai";
import { Niche, BusinessProfile } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateMarketingAssets(business: BusinessProfile, niche: Niche, customPrompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    System: You are an expert digital marketing strategist for an agency called BrandUp.
    Task: Generate high-converting marketing assets for a business based on its profile and its niche templates.

    Business Details:
    - Name: ${business.name}
    - Description: ${business.description}
    - Target Audience: ${business.targetAudience || 'General'}
    - USP: ${business.usp || 'Quality and service'}
    
    Niche: ${niche.nicheName}
    Niche Templates/Context:
    - Target Customers: ${niche.targetCustomers}
    - Services: ${niche.servicesOffered.join(', ')}
    - Problems to address: ${niche.commonProblems.join(', ')}
    - Offer Ideas: ${niche.offerIdeas.join(', ')}
    
    User Prompt: ${customPrompt}

    Generate the following assets in valid JSON format ONLY. Do not include any markdown formatting like \`\`\`json. Just the JSON.
    JSON structure:
    {
      "headline": "...',
      "offer": "...",
      "landingPage": "Detailed structure with hero, features, and benefits...",
      "googleAds": "Headline 1 | Headline 2 | Headline 3 - Description...",
      "metaAds": "Hook, Body copy, CTA...",
      "whatsapp": "Message template...",
      "instagram": "3 Post ideas with captions...",
      "reelScript": "Short script for a reel...",
      "imagePrompt": "Detailed AI image generation prompt...",
      "proposal": "Key selling points for a client proposal...",
      "followUp": "Message to follow up with leads...",
      "leadForm": "3-5 key questions for a lead capture form"
    }

    Keep it premium, persuasive, and professional.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate assets. Please check your API key.");
  }
}
