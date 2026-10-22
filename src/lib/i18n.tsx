import { createContext, useContext } from 'react';
import { COPY, Copy } from '../content/copy';
import { Language } from '../types';

interface LangContextValue {
  lang: Language;
  t: Copy;
  setLang: (lang: Language) => void;
}

export const LangContext = createContext<LangContextValue>({ lang: 'es', t: COPY.es, setLang: () => {} });

export const useLang = () => useContext(LangContext);
