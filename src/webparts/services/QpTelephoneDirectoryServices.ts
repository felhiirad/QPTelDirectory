import { Web, CamlQuery } from "sp-pnp-js";
import { listsName } from "../constants/lists";
import { Employees, Delegations } from "../entities/IEmployees";
import { getRecursive } from "../tools/GetAllItems";

/**
 * Get employee information
 * @param siteUrl Site url
 * @param staffNo Employee Staff No
 */
export const getEmployeeInfo = (siteUrl: string, staffNo: number): Promise<Employees> => {
  var web = new Web(siteUrl);
  // Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>" + staffNo + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml,
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((item: Employees) => {
    return item != null ? item[0] : null;
  });
};

/**
 * Get employee by query
 * @param siteUrl Site url
 * @param staffNo Employee Staff No
 */
export const getEmployeeByQuery = (siteUrl: string, query: string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  var staffNo = parseInt(query);
  var xml = "";
  if(!isNaN(staffNo))
  {
    xml = "<View><Query><Where><Eq><FieldRef Name='Staff_No' /><Value Type='Number'>" + staffNo + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  } else {
    xml = "<View><Query><Where><Eq><FieldRef Name='Reference_Indicator' /><Value Type='Text'>" + query + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  }

  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(q).then((items: Employees[]) => {
    if(items.length == 0){
      xml = "<View><Query><Where><Contains><FieldRef Name='Full_Name' /><Value Type='Text'>" + query + "</Value></Contains></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
      const qq: CamlQuery = {
        ViewXml: xml
      };

      return web.lists.getByTitle(listsName.employees).getItemsByCAMLQuery(qq).then((res: Employees[]) => {
        return res;
      });
    }
    return items;
  });
};

/**
 * Get all subordinates for a given employee
 * @param siteUrl Site url
 * @param staffNo Employee Staff No
 */
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

/**
 * Get all employees
 * @param siteUrl Site url
 */
export const getAllEmployees = (siteUrl: string): Promise<Employees[]> => {
  var web = new Web(siteUrl);
  return new Promise<Employees[]>((res, rej) => {
    getRecursive(web, (results) => {
      res(results);
    });
  });
};

/**
 * Get employee by department
 * @param siteUrl Site url
 * @param staffNo Employee Staff No
 */
export const getEmployeeByDepartment = (siteUrl: string, department: string): Promise<Employees[]> => {
  return getAllEmployees(siteUrl).then((items: Employees[]) => {
    return items.filter(e => e.Department == department);
  });
};

/**
 * Get all delegations for a given employee
 * @param siteUrl Site url
 * @param staffNo Employee Staff No
 */
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
        detegation.Delegate = emp;
      });
    }
    return delegations;
  });
};

/**
 * Get List title from config
 * @param siteUrl Site url
 * @param listName List name
 */
export const getlistConfiguration = (siteUrl: string, listName: string): Promise<any> => {
  var web = new Web(siteUrl);
  //Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='ListName' /><Value Type='Choice'>" + listName + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.listConfig).getItemsByCAMLQuery(q).then((items: any) => {
    return items != null ? items[0].Title : null;
  });
};

/**
 * Get page title from config
 * @param siteUrl Site url
 * @param listName Page name
 */
export const getPageConfiguration = (siteUrl: string, pageName: string): Promise<any> => {
  var web = new Web(siteUrl);
  //Caml query object
  const xml = "<View><Query><Where><Eq><FieldRef Name='PageName' /><Value Type='Choice'>" + pageName + "</Value></Eq></Where></Query><RowLimit Paged='TRUE'>11000</RowLimit></View>";
  const q: CamlQuery = {
    ViewXml: xml
  };

  return web.lists.getByTitle(listsName.pageConfig).getItemsByCAMLQuery(q).then((items: any) => {
    return items != null ? items[0].Title : null;
  });
};
