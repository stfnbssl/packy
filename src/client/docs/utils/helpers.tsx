import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export function titleize(string: string) {
  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function pageToTitle(page: any) {
  if (page.title === false) {
    return null;
  }
  if (page.title) {
    return page.title;
  }
  const name = page.pathname.replace(/.*\//, '');
  if (page.pathname.indexOf('/api/') !== -1) {
    return upperFirst(camelCase(name));
  }
  return titleize(name);
}