import { Payload } from 'src/models/payload';

export type AuthRequest = Payload;

export type PaginationRequest = {
  page: number;
  size: number;
  sort: 'asc' | 'des';
};
