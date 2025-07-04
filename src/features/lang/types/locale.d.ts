import type { LocaleMessages } from './lang.types';
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: LocaleMessages;
    }
  }
}
