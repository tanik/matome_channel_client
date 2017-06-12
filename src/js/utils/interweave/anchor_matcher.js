import { Matcher } from 'interweave';

export default class AnchorMatcher extends Matcher {
  match(string) {
    const matches = string.match(/>>(\d+)/);

    if (!matches) {
      return null;
    }

    return {
      match: matches[0],
      extraProp: matches[1],
    };
  }

  asTag() {
    return 'a';
  }
}
