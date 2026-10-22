import { Language } from '../types';

const SPANISH_COUNTRIES = new Set([
  'ES', // Spain
  'MX', // Mexico
  'CO', // Colombia
  'AR', // Argentina
  'PE', // Peru
  'VE', // Venezuela
  'CL', // Chile
  'EC', // Ecuador
  'GT', // Guatemala
  'CU', // Cuba
  'BO', // Bolivia
  'DO', // Dominican Republic
  'HN', // Honduras
  'PY', // Paraguay
  'SV', // El Salvador
  'NI', // Nicaragua
  'CR', // Costa Rica
  'PA', // Panama
  'UY', // Uruguay
  'PR', // Puerto Rico
  'GQ', // Equatorial Guinea
]);

const STORAGE_KEY = 'user_preferred_language';

/**
 * Gets the initial fallback language based on stored preference or browser locale.
 */
export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') {
      return saved;
    }
  } catch {
    // Ignore localStorage errors
  }

  // Fallback to browser navigator language
  try {
    const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (navLang.startsWith('es')) {
      return 'es';
    }
  } catch {
    // Ignore navigator errors
  }

  return 'en';
}

/**
 * Persists the user's explicit language preference.
 */
export function saveLanguagePreference(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Detects the user's language by checking their IP geolocation.
 * Resolves to 'es' for Spanish-speaking countries and 'en' for all others.
 * Respects any existing user choice in localStorage.
 */
export async function detectLanguageByIp(): Promise<Language | null> {
  // If user has manually chosen a language, do not override
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') {
      return saved as Language;
    }
  } catch {
    // Ignore
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  try {
    // Try fast country detection service
    const res = await fetch('https://api.country.is/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const countryCode = (data.country || '').toUpperCase();
      if (countryCode) {
        return SPANISH_COUNTRIES.has(countryCode) ? 'es' : 'en';
      }
    }
  } catch {
    // Secondary attempt with ipapi.co if needed
    try {
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 2000);
      const res2 = await fetch('https://ipapi.co/json/', {
        signal: controller2.signal,
      });
      clearTimeout(timeoutId2);
      if (res2.ok) {
        const data2 = await res2.json();
        const code = (data2.country_code || '').toUpperCase();
        if (code) {
          return SPANISH_COUNTRIES.has(code) ? 'es' : 'en';
        }
      }
    } catch {
      // Ignore network errors
    }
  }

  return null;
}
