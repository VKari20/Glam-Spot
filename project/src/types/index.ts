export interface Customer {
  phoneNumber: string;
  visits: number;
  lastVisit: string;
  rewardStatus: RewardStatus;
  rewardClaimed: boolean;
  name?: string;
}

export interface LoyaltySettings {
  businessName: string;
  rewardMessage: string;
}

export interface RewardTier {
  visits: number;
  reward: string;
  description: string;
}

export type RewardStatus = 'None' | 'Free Hair Wash' | 'Free Haircut' | 'Free Hair Product';

export const REWARD_TIERS: RewardTier[] = [
  {
    visits: 3,
    reward: 'Free Hair Wash',
    description: 'Enjoy a relaxing hair wash on us!'
  },
  {
    visits: 5,
    reward: 'Free Haircut',
    description: 'Time for a fresh new look!'
  },
  {
    visits: 8,
    reward: 'Free Hair Product',
    description: 'Choose any product from our premium collection!'
  }
];

export const SURPRISE_REWARDS = [
  'Mini Hair Oil',
  'Luxury Scrunchie Set',
  'Detangler Spray',
  'Hair Mask Treatment',
  'Travel-Size Dry Shampoo'
];