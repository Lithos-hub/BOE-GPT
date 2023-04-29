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

export interface BoeDictionaryData {
  [x: string]: SectionData[];
}

export interface BoeDictionary {
  dictionaryData: {
    [x: string]: SectionData[];
  };
  date: string;
}
