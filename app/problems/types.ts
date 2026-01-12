import { ReactNode } from "react";

export type Category = {
  category: ReactNode;
  description: ReactNode;
  questions: Question[]
}

export interface Attachment {
  name: string;
  type: 'image' | 'file';
  url: string;
}

export interface RequestFormat {
  type: 'json' | 'text' | 'binary';
  example?: string;
}

export interface API {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  requestFormat?: RequestFormat;
}

export type Question = {
  title: ReactNode;
  description: ReactNode;
  hints?: string[] | ReactNode;
  points: number;
  attachments?: Attachment[];
  link?: string;
  api?: API;
  lockedPassword?: string;
  lockedHint?: string;
}
