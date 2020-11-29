import { listsName } from "../constants/lists";

/**
 * Get all items for a given list
 * @param web
 * @param callback
 * @param lii
 * @param items
 */
export const getRecursive = (web, callback, lii = -1, items = []) => {
  var q = web.lists.getByTitle(listsName.employees).items.top(5000);
  if (lii !== -1) {
    q = q.skip(lii);
  }
  q.get().then((res) => {
    if (res.length != 0) {
      items = items.concat(res);
      callback(items);
      getRecursive(web, callback, res[res.length - 1].Id, items);
    }
  });
};
