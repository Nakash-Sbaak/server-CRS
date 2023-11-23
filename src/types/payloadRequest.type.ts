import { Request } from 'express';

type payload = {
  id: number;
  role: string;
};

export type AuthRequest = Request & payload;
