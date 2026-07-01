export interface AppTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
    buttonText: string;
  };
  assets: {
    backgroundImage: string;
    logo: string;
  };
  gameConfig: {
    rewardMultiplier: number;
    particles: string;
  };
}