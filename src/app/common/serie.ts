export interface Genre {
  name: string;
  image: string;
}

export interface Score {
  email: string;
  score: number;
}

export interface Serie {
  id: string;
  title: string;
  images: string[];
  genres: Genre[];
  num_episodes: number;
  year_of_emision: number;
  synopsis: string;
  scores: Score[];
}
