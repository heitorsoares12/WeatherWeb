export interface UserFavoritesResponse {
  $id: string;
  $values: FavoriteCity[];
}

export interface FavoriteCity {
  $id: string;
  cityName: string;
}
