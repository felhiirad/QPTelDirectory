import { Web, CamlQuery } from "sp-pnp-js";
import { listsName } from "../constants/lists";
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

export const getEmployeeSupervisor = (siteUrl: string, empItemId: number): Promise<Employees> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>100</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees) => {
    console.log(items);
    return items;
  });
};

//TOBE Merged
export const getEmployeeSubordinates = (siteUrl: string, empItemId: number): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  //Caml query object NB : without RowLimit Paged="TRUE">5000  results will be null
  const xml = "<View><Query><Where><Eq><FieldRef Name='Supervisor_ID' /><Value Type='Number'>101</Value></Eq></Where></Query><RowLimit Paged='TRUE'>5000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    console.log(items);
    return items;
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

export const getEmployeeLeaves = (siteUrl: string, empItemId: number): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>100</Value></Eq></Where></Query>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.delegations).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    console.log(items);
    return items;
  });
};

export const getEmployeePhoto = async (siteUrl: string, empItemId: number): Promise<any> => {
  var web = new Web(siteUrl);
  return web.lists.getByTitle(listsName.employees).items.getById(empItemId).attachmentFiles.get().then((attachs) => {
    return attachs.length != 0 ? siteUrl.split("/sites")[0] + attachs[0].ServerRelativeUrl : "";
  });
};

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

