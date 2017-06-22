import { Matcher } from 'interweave';

export default class AnchorMatcher extends Matcher {
  match(string) {
    const matches = string.match(/>>(\d+)/);

    if (!matches) {
      return null;
    }

    return {
      match: matches[0],
      num: matches[1],
    };
  }

  asTag() {
    return 'a';
  }
}
