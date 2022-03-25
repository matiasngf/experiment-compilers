import emojs from './langs/emojs';

import loader, { raw } from './index';

module.exports = loader;
module.exports.raw = raw;
module.exports.langs = {
  'emojs': emojs
};