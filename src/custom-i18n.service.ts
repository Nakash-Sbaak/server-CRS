import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CustomI18Service {
  constructor(private i18n: I18nService) {}
  translate(key: string, options?: any) {
    const lang: string = I18nContext.current().lang;
    return this.i18n.t(key, { lang, ...options });
  }
}
