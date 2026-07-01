import { AppTheme } from './types';

export const christmasTheme: AppTheme = {
  colors: {
    primary: "#EF4444", // Vermelho Natal
    background: "#FEF2F2",
    text: "#991B1B",
    buttonText: "#FFFFFF",
  },
  assets: {
    backgroundImage: "bg_christmas.png",
    logo: "logo_christmas.png",
  },
  gameConfig: {
    rewardMultiplier: 2.0, // Dobro de moedas!
    particles: "snow_effect",
  }
};