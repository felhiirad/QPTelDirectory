import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, FilterSettingsModel, SortSettingsModel, ColumnDirective, Inject, Page, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

require('../../../../node_modules/@syncfusion/ej2-base/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-buttons/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-calendars/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-dropdowns/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-inputs/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-navigations/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-popups/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/fabric.css');
require('../../../../node_modules/@syncfusion/ej2-react-grids/styles/fabric.css');

import { IQpTelephoneDirectoryWhosWhoProps } from './IQpTelephoneDirectoryWhosWhoProps';
import { getAllEmployees, getlistConfiguration } from '../../services/QpTelephoneDirectoryServices';
import { Employees } from '../../entities/IEmployees';
import QpTelephoneDirectoryDetails from './QpTelephoneDirectoryDetails';
import { GlobalLoader } from '../../tools/GlobalLoader';
import { Query } from '@syncfusion/ej2-data';

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
  const [departments, setDepartments] = useState<any>(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  var gridInstance: GridComponent;
  var dropDownListInstance: DropDownListComponent;
  var filter: FilterSettingsModel = {
    type: 'Menu'
  };

  const fields = { text: 'department', value: 'key' };
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

  const dialogOpen = useCallback((employee) => {
    setShowDetails(true);
    setSelectedEmployee(employee);
  }, []);

  const clearData = (): void => {
    setSelectedEmployee(null);
  };

  const nameTemplate = (employee): any => {
    return (
      <EmployeeName onClick={() => dialogOpen(employee)} >{employee.Full_Name}</EmployeeName>
    );
  };

  useEffect(() => {
    var deprts = [];
    deprts.push({ department: 'All', key: '1' }); var key = 2;
    //anis
    const listEmp = getlistConfiguration(props.siteUrl, "Employees").then((items) => {
      console.log(items)
    })
    //anis
    //  setSelectedDepartment(props.selectedDepartment);
    var query = new URLSearchParams(window.location.search).get("department");
    if (query != null && query != "") {
      gridInstance.filterSettings.columns = [
        {
          field: 'Department', matchCase: false,
          operator: 'equal', predicate: 'and', value: query
        }
      ];
    }

    getAllEmployees(props.siteUrl).then((items: Employees[]) => {
      setEmployees(items);
      setLoading(false);
      for (var emp of items) {
        if (deprts.find(e => e.department == emp.Department) == undefined) {
          deprts.push({ department: emp.Department, key: `${key}` });
          if (query == emp.Department)
            setSelectedDepartment(`${key}`);
          key++;
        }
      }
      setDepartments(deprts);
    });
  }, []);

  const onChange = (sel) => {
    if (sel.itemData.department === 'All') {
      gridInstance.clearFiltering();
      setSelectedEmployee(null);
      setSelectedDepartment(null);
    }
    else {
      gridInstance.filterByColumn('Department', 'equal', sel.itemData.department);
      setSelectedEmployee(null);
      setSelectedDepartment(sel.itemData.key);
    }
  };

  return (
    <MainWrapper>
      <div style={{ padding: '14px 0' }}>
        <div className="select-wrap">
          <DropDownListComponent allowFiltering={true} value={selectedDepartment} dataSource={departments} ref={(d) => dropDownListInstance = d} fields={fields} change={(sel) => onChange(sel)} placeholder="Select department to filter" width="400px" />
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
          <ColumnDirective headerText="Photo" allowSorting={false} allowFiltering={false} template={photoTemplate} />
          <ColumnDirective field="Full_Name" headerText="Name" clipMode='EllipsisWithTooltip' template={nameTemplate} />
          <ColumnDirective field="Staff_No" headerText="Staff No." clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
          <ColumnDirective field="Department" headerText="Department" clipMode='EllipsisWithTooltip' />
          <ColumnDirective field="Reference_Indicator" headerText="Reference Ind." clipMode='EllipsisWithTooltip' />
          <ColumnDirective field="Office_Phone_No_1" headerText="Office Phone No." clipMode='EllipsisWithTooltip' />
          <ColumnDirective field="Mobile_No" headerText="Mobile No." clipMode='EllipsisWithTooltip' />
          <ColumnDirective field="Email" headerText="Email" clipMode='EllipsisWithTooltip' />
        </ColumnsDirective>
        <Inject services={[Page, Filter, Sort, Selection]} />
      </GridComponent>
      {selectedEmployee && <QpTelephoneDirectoryDetails hideDialog={showDetails} employee={selectedEmployee} siteUrl={props.siteUrl} clearData={clearData} />}
    </MainWrapper>
  );
};

export default QpTelephoneDirectoryWhosWho;
