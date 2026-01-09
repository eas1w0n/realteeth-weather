export interface CurrentWeatherResponse {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;

  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };

  name: string;
}
