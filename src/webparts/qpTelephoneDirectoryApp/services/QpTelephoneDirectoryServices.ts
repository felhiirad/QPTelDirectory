import { sp } from "sp-pnp-js";
import { listsName } from "../constants/lists";
import { Employees } from "../entities/IEmployees";

export const getAllEmployees = (): Promise<Employees[]> => {
  return sp.web.lists.getByTitle(listsName.employees).items.top(5000).get().then((items: Employees[]) => {
    return items;
  });
};
