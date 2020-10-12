import { Web } from "sp-pnp-js";
import { listsName, listViews } from "../constants/lists";
import { Employees } from "../entities/IEmployees";
import { ICamlQuery } from "@pnp/sp/lists";


//TOBE Merged
export const getEmployeeSupervisor = (siteUrl: string, Emp_item_Id: number): Promise<Employees> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>100</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: ICamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees) => {
    console.log(items);
    return items
  });
  ;
};

//TOBE Merged
export const getEmployeeSubordinates = (siteUrl: string, Emp_item_Id: number): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  //Caml query object NB : without RowLimit Paged="TRUE">5000  results will be null
  const xml = "<View><Query><Where><Eq><FieldRef Name='Supervisor_ID' /><Value Type='Number'>101</Value></Eq></Where></Query><RowLimit Paged='TRUE'>5000</RowLimit></View>";
  const q: ICamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    console.log(items);
    return items;
  });

};

//TOBE Merged
export const getEmployeeLeaves = (siteUrl: string, Emp_item_Id: number): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>100</Value></Eq></Where></Query>";
  const q: ICamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.delegations).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    console.log(items);
    return items
  });
  ;
};

//TOBE Merged
export const getEmployeePhoto = async (siteUrl: string, Emp_item_Id: number): Promise<any> => {
  var web = new Web(siteUrl);
  let PhotoURL: string;
  return web.lists.getByTitle(listsName.employees).items.getById(Emp_item_Id).attachmentFiles.get().then((attachs) => {
    PhotoURL = attachs.length != 0 ? siteUrl.split("/sites")[0] + attachs[0].ServerRelativeUrl : "";
    return PhotoURL;
  });
};

//TOBE Merged
export const getAllEmployeesInfo = (siteUrl: string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  var AllEmp: Employees[];
  return web.lists.getByTitle(listsName.employees).items.top(5000).get().then(async (items1: Employees[]) => {
    AllEmp = items1;
    console.log(AllEmp.length);
    return web.lists.getByTitle(listsName.employees).items.skip(5000).top(5000).get().then(async (items: Employees[]) => {
      let AllEmpResult: Employees[];
      AllEmpResult = AllEmp.concat(items);
      return AllEmpResult;
    });

  });
};

