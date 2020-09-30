import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Selection, Search, Toolbar } from '@syncfusion/ej2-react-grids';

import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css';

import { IQpTelephoneDirectoryAppProps } from './IQpTelephoneDirectoryAppProps';
import { getAllEmployees, getFirstViewEmployees, getSecondViewEmployees } from '../services/QpTelephoneDirectoryServices';
import { Employees } from '../entities/IEmployees';
import {GlobalLoader} from '../tools/GlobalLoader';

const MainWrapper = styled.div`
	padding: 1rem;
`;

export const QpTelephoneDirectoryApp: FC<IQpTelephoneDirectoryAppProps> = props => {

	const [isLoading, setLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Employees[]>(undefined);

  var gridInstance: GridComponent;
  const filter: any = {
    type: 'Menu'
  };

  const photoTemplate = (employee): any => {
    return (<div>
      <div className="empimg">
        <span className="e-userimg">
          {employee.Gender == 'M' && <img width="50" src={require('../../assets/avatar-male.png')} />}
          {employee.Gender == 'F' && <img width="50" src={require('../../assets/avatar-female.png')} />}
        </span>
      </div>
    </div>);
  };

	useEffect(() => {
		getAllEmployees(props.siteUrl).then((items: Employees[]) => {
			setEmployees(items);
			setLoading(false);
		});
  }, []);

	return (
		<MainWrapper>
			{employees && <GridComponent
				dataSource={employees}
        enableHover={false}
        ref={(g) => { gridInstance = g; }}
				allowSelection={true}
        allowPaging={true}
        filterSettings={filter}
				allowFiltering={true}
        allowSorting={true}
        toolbar={['Search']}
			>
				<ColumnsDirective>
          <ColumnDirective headerText="Photo"  allowSorting={false} allowFiltering={false}  template={photoTemplate} />
					<ColumnDirective field="Full_Name" headerText="Name"  clipMode='EllipsisWithTooltip' />
					<ColumnDirective field="Staff_No" headerText="Staff No." clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
					<ColumnDirective field="Reference_Indicator" headerText="Reference Ind." clipMode='EllipsisWithTooltip' />
					<ColumnDirective field="Office_Phone_No_1" headerText="Office Phone No." clipMode='EllipsisWithTooltip' />
					<ColumnDirective field="Mobile_No" headerText="Mobile No." clipMode='EllipsisWithTooltip' />
					<ColumnDirective field="Email" headerText="Email" clipMode='EllipsisWithTooltip' />
				</ColumnsDirective>
				<Inject services={[Page, Filter, Sort, Selection, Search, Toolbar]} />
			</GridComponent>}
		</MainWrapper>
	);
};

export default QpTelephoneDirectoryApp;
