import { Metadata } from "next";

export type Genre = {
  id: number;
  name: string;
};
export type Props = {
  movie: movieDetail;
};
export type CreditCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};
export type belongs_to_collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};
export type production_companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
export type production_countries = {
  iso_3166_1: string;
  name: string;
};
export type spoken_languages = {
  english_name: string;
  iso_639_1: string;
  name: string;
};
export type PropsParams = {
  params: Params;
};
export type Params = {
  id: string;
};
export type movieDetail = {
  adult?: boolean;
  backdrop_path: string;
  belongs_to_collection?: belongs_to_collection;
  budget?: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path: string;
  production_companies?: production_companies[];
  production_countries?: production_countries[];
  release_date: string;
  revenue?: number;
  runtime: number;
  spoken_languages?: spoken_languages[];
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
};
export type data = {
  results: movieDetail[];
  page: number;
  total_pages: number;
};
export type FeaturedData = {
  results: FeaturedDataResult[];
};
export type FeaturedDataResult = {
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  id: number;
  backdrop_path: string;
};
