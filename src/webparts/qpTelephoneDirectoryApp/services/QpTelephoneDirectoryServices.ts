import { Web } from "sp-pnp-js";
import { listsName, listViews } from "../constants/lists";
import { Employees } from "../entities/IEmployees";

export const getAllEmployees = (siteUrl : string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  return web.lists.getByTitle(listsName.employees).items.top(5000).get().then((items: Employees[]) => {
    return items;
  });
};

export const getFirstViewEmployees = (siteUrl : string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  var list = web.lists.getByTitle(listsName.employees);
  return list.views.getByTitle(listViews.firstItems)  .get().then((items: Employees[]) => {
    return items;
  });
};

export const getSecondViewEmployees = (siteUrl : string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  var list = web.lists.getByTitle(listsName.employees);
  return list.views.getByTitle(listViews.secondItems).get().then((items: Employees[]) => {
    return items;
  });
};

// const getViewQueryForList = (listName:string, viewName:string): Promise<any> => {
//   let listViewData = "";
//   if(listName && viewName){
//       return pnp.sp.web.lists.getByTitle(listName).views.getByTitle(viewName).select("ViewQuery").get().then(v => {
//           return v.ViewQuery;
//       });
//   } else {
//       console.log('Data insufficient!');
//       listViewData = "Error";
//   }
// };


// //Second method that retrieves the View data based on the View Query and List name
// const getItemsByViewQuery = (listName:string, query:string): Promise<any> => {
//   const xml = '<View><Query>' + query + '</Query></View>';
//   return pnp.sp.web.lists.getByTitle(listName).getItemsByCAMLQuery({'ViewXml':xml}).then((res:SPHttpClientResponse) => {
//       return res;
//   });
// };
