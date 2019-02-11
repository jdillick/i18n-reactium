import Jed from 'jed'

const getLocale = () => {
      const langRaw = window.navigator.userLanguage || window.navigator.language
      const [lang, location] = langRaw.replace('-', '_').split('_')
      return `${lang}_${location}`;
};

const getStrings = (locale) => {
    let context;
    if ( ! locale ) {
        locale = getLocale();
    }

    if ( typeof window !== 'undefined' ) {
        context = require.context('babel-loader!po-loader!../../../translations', true, /.pot?$/);
        if ( context.keys().find(translation => translation === `./${locale}.po`) ) {
            return context(`./${locale}.po`);
        }

        return context('./template.pot');
    } else {
        // ssr version
    }
};

const i18n = new Jed(JSON.parse(getStrings().strings))
export default i18n;

export const __ = message => i18n.gettext(message);
export const _n = (singular, plural, count) => i18n.ngettext(singular, plural, count);
