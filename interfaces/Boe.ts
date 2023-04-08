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
      href: string;
      subtitle: string | null;
    };
  };
}
