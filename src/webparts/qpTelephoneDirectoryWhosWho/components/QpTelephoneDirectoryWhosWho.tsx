import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { IQpTelephoneDirectoryWhosWhoProps } from './IQpTelephoneDirectoryWhosWhoProps';
import { Employees } from '../../entities/IEmployees';
import QpTelephoneDirectoryDetails from './QpTelephoneDirectoryDetails';
import { GlobalLoader } from '../../tools/GlobalLoader';
import EmployeeCard from './QpTelephoneDirectoryCard';
import { titleCase } from '../../tools/StringFormatter';
import { getRecursive } from '../../tools/GetAllItems';
import { Web } from 'sp-pnp-js';
import '../../styles/SearchResults.css';

const MainWrapper = styled.div`
  padding: 1rem;
  min-height: 1015px;
`;

const EmployeeName = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

export const QpTelephoneDirectoryWhosWho: FC<IQpTelephoneDirectoryWhosWhoProps> = props => {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employees[]>(undefined);
  const [divisions, setDivisions] = useState<any>(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees>(null);

  var gridInstance: GridComponent;
  var dropDownListInstance: DropDownListComponent;
  var filter: any = {
    type: 'Menu'
  };

  const fieldFilter: any = {
    type: 'CheckBox'
  };

  const fields = { text: 'division', value: 'key' };
  const sortingOptions: any = {
    columns: [{ field: 'Staff_No', direction: 'Ascending' }]
  };

  const onError = (event) => {
    event.target.src = require('../../assets/avatar-male.png');
  };

  const photoTemplate = (employee): any => {
    return (<EmployeeCard employee={employee} siteUrl={props.siteUrl} >
      <div className="photoGrid">
        <span className="e-userimg">
          {employee.Gender == 'M' && <img width="50" src={"/sites" + props.siteUrl.split("/sites")[1] + "/Employee%20Photos/" + employee.Staff_No + ".jpg"} onError={onError} />}
          {employee.Gender == 'F' && <img width="50" src={require('../../assets/avatar-female.png')} />}
        </span>
      </div>
    </EmployeeCard>);
  };

  const dialogOpen = useCallback((employee) => {
    setShowDetails(true);
    setSelectedEmployee(employee);
  }, []);

  const clearData = (): void => {
    setSelectedEmployee(null);
  };

  const nameTemplate = (employee): any => {
    return (
      <EmployeeName onClick={() => dialogOpen(employee)} >{titleCase(employee.Full_Name)}</EmployeeName>
    );
  };

  const emailTemplate = (employee): any => {
    return (
      <div>{employee.Email ? employee.Email.toLowerCase() : employee.Email}</div>
    );
  };

  useEffect(() => {
    var department = props.selectedDepartment != "" ? props.selectedDepartment : new URLSearchParams(window.location.search).get("department");

    var divs = [];
    var web = new Web(props.siteUrl);
    divs.push({division: 'All', key: '1'}); var key = 2;
    getRecursive(web, (results) => {
      var items = results.filter(e => e.Department == department);
      setEmployees(items);
      setLoading(false);
      for (var emp of items) {
        if (divs.find(e => e.division == emp.Division) == undefined) {
          divs.push({division: emp.Division, key: `${key}`});
          key++;
        }
      }
      setDivisions(divs);
    });
  }, []);

  const onChange = (sel) => {
    if (sel.itemData.division === 'All') {
        gridInstance.clearFiltering();
        setSelectedEmployee(null);
    }
    else {
        gridInstance.filterByColumn('Division', 'equal', sel.itemData.division);
        setSelectedEmployee(null);
    }
  };

  return (
    <MainWrapper>
      <GlobalLoader isLoading={isLoading}>
        <div style={{ padding: '14px 0' }}>
          <div className="select-wrap">
            <DropDownListComponent allowFiltering={true} dataSource={divisions} ref={(d) => dropDownListInstance = d} fields={fields} change={(sel) => onChange(sel)} placeholder="Select division to filter" width="400px" />
          </div>
        </div>
        <GridComponent
          dataSource={employees}
          enableHover={false}
          ref={(g) => { gridInstance = g; }}
          allowSelection={true}
          allowPaging={true}
          filterSettings={filter}
          allowFiltering={true}
          allowSorting={true}
          sortSettings={sortingOptions}
        >
          <ColumnsDirective>
          <ColumnDirective headerText="Photo" width="80" allowSorting={false} allowFiltering={false} template={photoTemplate} />
            <ColumnDirective field="Full_Name" headerText="Name" clipMode='EllipsisWithTooltip' template={nameTemplate} />
            <ColumnDirective field="Staff_No" width="80" headerText="Staff No." clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
            <ColumnDirective field="Department" filter={fieldFilter} headerText="Department" clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Division" filter={fieldFilter} headerText="Division" clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Reference_Indicator" width="80" headerText="Reference Ind." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Office_Phone_No_1" width="100" headerText="Office Phone No." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Mobile_No" width="100" headerText="Mobile No." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Email" headerText="Email" clipMode='EllipsisWithTooltip' template={emailTemplate} />
          </ColumnsDirective>
          <Inject services={[Page, Filter, Sort, Selection]} />
        </GridComponent>
        {selectedEmployee && <QpTelephoneDirectoryDetails hideDialog={showDetails} employee={selectedEmployee} siteUrl={props.siteUrl} clearData={clearData} />}
      </GlobalLoader>
    </MainWrapper>
  );
};

export default QpTelephoneDirectoryWhosWho;
