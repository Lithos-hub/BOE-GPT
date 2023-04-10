export interface IBoe {
  boeId: string;
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

export interface SectionData {
  section: string;
  boe: string;
  href: string;
  subtitle: string | null;
}

export interface BoeDictionaryData extends Omit<BoeDictionary, "date"> {}

export interface BoeDictionary {
  dictionaryData: {
    [x: string]: {
      [index: string]: SectionData[];
    };
  };
  date: string;
}
