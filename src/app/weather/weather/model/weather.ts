export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherCurrent {
  lastUpdated: string;
  temp: number;
  feelsLike: number;
  condition: WeatherCondition;
}

export interface WeatherLocation {
  name: string;
  country: string;
}

export interface Weather {
  location: WeatherLocation;
  current: WeatherCurrent;
}
