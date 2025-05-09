import 'i18next';

import { TranslationTypes } from '@/shared/libs/i18n/translations/TranslationTypes';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: TranslationTypes;
  }
}
