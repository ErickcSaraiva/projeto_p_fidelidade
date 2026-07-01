import { AppTheme } from './types';

export const defaultTheme: AppTheme = {
  colors: {
    primary: "#3B82F6", // Azul padrão
    background: "#F3F4F6",
    text: "#1F2937",
    buttonText: "#FFFFFF",
  },
  assets: {
    backgroundImage: "bg_default.png",
    logo: "logo_catchup.png",
  },
  gameConfig: {
    rewardMultiplier: 1.0,
    particles: "none",
  }
};