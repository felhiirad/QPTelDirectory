import { Web, CamlQuery } from "sp-pnp-js";
import { listsName } from "../constants/lists";
import { Employees, Delegations } from "../entities/IEmployees";

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

export const getEmployeeInfo = (siteUrl: string, staffNo: number): Promise<Employees> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>" + staffNo + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((item: Employees) => {
    return item;
  });
};

export const getEmployeeSupervisor = (siteUrl: string, staffNo: number): Promise<Employees> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>" + staffNo + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((item: Employees) => {
    return item;
  });
};

export const getEmployeeSubordinates = (siteUrl: string, staffNo: number): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  //Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Supervisor_ID' /><Value Type='Number'>" + staffNo + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    return items;
  });

};

export const getAllEmployees = (siteUrl: string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  return new Promise<Employees[]>((res, rej) => {
    getRecursive(web, (results) => {
      res(results);
    });
  });
};

export const getEmployeeLeaves = (siteUrl: string, staffNo: number): Promise<Delegations[]> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><And><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>" + staffNo + "</Value></Eq><And><Leq><FieldRef Name='Leave_Start_Date' /><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Leq><Geq><FieldRef Name='Leave_End_Date' /><Value IncludeTimeValue='TRUE' Type='DateTime'><Today/></Value></Geq></And></And></Where></Query></View>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.delegations).getItemsByCAMLQuery(q).then(async (delegations: Delegations[]) => {
    for (var detegation of delegations) {
      await getEmployeeInfo(siteUrl, detegation.Delegate_Staff_No).then(emp => {
        detegation.Delegate = emp != null ? emp[0] : null;
      });
    }
    return delegations;
  });
};

export const getEmployeePhoto = async (siteUrl: string, empItemId: number): Promise<any> => {
  var web = new Web(siteUrl);
  return web.lists.getByTitle(listsName.employees).items.getById(empItemId).attachmentFiles.get().then((attachs) => {
    return attachs.length != 0 ? siteUrl.split("/sites")[0] + attachs[0].ServerRelativeUrl : "";
  });
};

