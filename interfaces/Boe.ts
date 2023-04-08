export interface IBoe {
  date: string;
  summary: string;
}

export type DBResponseSuccess = {
  success: boolean;
  data: IBoe[];
};

export type DBResponseError = {
  success: boolean;
  message: string;
};

export interface BoeDictionary {
  [index: string]: {
    [index: string]: {
      section: string;
      boe: string;
      href: string;
      date: string;
      subtitle: string | null;
    }[];
  };
}
