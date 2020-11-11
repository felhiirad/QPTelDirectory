import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, SortSettingsModel, ColumnDirective, Inject, Page, Sort, Filter, Selection, Search, Toolbar, SearchSettingsModel } from '@syncfusion/ej2-react-grids';

require('../../../../node_modules/@syncfusion/ej2-base/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-calendars/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-dropdowns/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-navigations/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-popups/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-react-grids/styles/fabric.css');

import { IQpTelephoneDirectoryAppProps } from './IQpTelephoneDirectoryAppProps';
import { getAllEmployees } from '../../services/QpTelephoneDirectoryServices';
import { Employees } from '../../entities/IEmployees';
import QpTelephoneDirectoryDetails from './QpTelephoneDirectoryDetails';
import { GlobalLoader } from '../../tools/GlobalLoader';

const MainWrapper = styled.div`
  padding: 1rem;
  min-height: 1015px;
`;

const EmployeeName = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

export const QpTelephoneDirectoryApp: FC<IQpTelephoneDirectoryAppProps> = props => {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employees[]>(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees>(null);

  var gridInstance: GridComponent;
  const filter: any = {
    type: 'Menu'
  };

  const fieldFilter: any = {
    type: 'CheckBox'
  };

  const sortingOptions: SortSettingsModel = {
    columns: [{ field: 'Staff_No', direction: 'Ascending' }]
  };

  const photoTemplate = (employee): any => {
    return (<div>
      <div className="empimg">
        <span className="e-userimg">
          {employee.Gender == 'M' && <img width="50" src={"/sites" + props.siteUrl.split("/sites")[1] + "/Employee%20Photos/" + employee.Staff_No + ".jpg"} />}
          {employee.Gender == 'F' && <img width="50" src={require('../../assets/avatar-female.png')} />}
        </span>
      </div>
    </div>);
  };

  const clearData = (): void => {
    setSelectedEmployee(null);
  };

  const dialogOpen = useCallback((employee) => {
    setShowDetails(true);
    setSelectedEmployee(employee);
  }, []);

  const nameTemplate = (employee): any => {
    return (
      <EmployeeName onClick={() => dialogOpen(employee)} >{employee.Full_Name}</EmployeeName>
    );
  };

  useEffect(() => {
    var query = new URLSearchParams(window.location.search).get("query");
    if (query != null && !isLoading) {
      gridInstance.searchSettings.key = query;
    }
    if(isLoading)
      getAllEmployees(props.siteUrl).then((items: Employees[]) => {
        setEmployees(items);
        setLoading(false);
      });
  }, [isLoading]);

  return (
    <MainWrapper>
      <GlobalLoader isLoading={isLoading}>
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
          toolbar={['Search']}
        >
          <ColumnsDirective>
            <ColumnDirective headerText="Photo" allowSorting={false} allowFiltering={false} template={photoTemplate} />
            <ColumnDirective field="Full_Name" headerText="Name" clipMode='EllipsisWithTooltip' template={nameTemplate} />
            <ColumnDirective field="Staff_No" headerText="Staff No." clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
            <ColumnDirective field="Department" filter={fieldFilter} headerText="Department" clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Division" filter={fieldFilter} headerText="Division" clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Reference_Indicator" filter={fieldFilter} headerText="Reference Ind." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Office_Phone_No_1" headerText="Office Phone No." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Mobile_No" headerText="Mobile No." clipMode='EllipsisWithTooltip' />
            <ColumnDirective field="Email" headerText="Email" clipMode='EllipsisWithTooltip' />
          </ColumnsDirective>
          <Inject services={[Page, Filter, Sort, Selection, Search, Toolbar]} />
        </GridComponent>
        {selectedEmployee && <QpTelephoneDirectoryDetails hideDialog={showDetails} employee={selectedEmployee} siteUrl={props.siteUrl} clearData={clearData} />}
      </GlobalLoader>
    </MainWrapper>
  );
};

export default QpTelephoneDirectoryApp;
