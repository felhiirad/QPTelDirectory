import { Web } from "sp-pnp-js";
import { listsName, listViews } from "../constants/lists";
import { Employees } from "../entities/IEmployees";

const getRecursive = (web, callback, lii = -1, items = []) => {
  var q = web.lists.getByTitle(listsName.employees).items.top(5000);
  if (lii !== -1) {
     q = q.skip(lii);
  }
  q.get().then((res) => {
     if (res.length === 0) {
        callback(items);
     } else {
        items = items.concat(res);
        getRecursive(web, callback, res[res.length - 1].Id, items);
     }
  });
};

export const getAllEmployees = (siteUrl : string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  return new Promise<Employees[]>((res, rej) => {
    getRecursive(web, (results) => {
      res(results);
    });
  });
};
