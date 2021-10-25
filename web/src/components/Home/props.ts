import React from 'react';

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactElement;
}

export interface FeaturesProps {
  features: FeatureProps[];
}
export interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  onGetStarted?: () => void;
  onHowItWorks?: () => void;
}

export interface CallToActionProps {
  title: string;
  body: string;
  link?: string;
  description?: string;
}
