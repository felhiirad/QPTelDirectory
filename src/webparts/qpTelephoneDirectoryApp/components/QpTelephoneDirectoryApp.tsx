import React, { FC, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css";

import { IQpTelephoneDirectoryAppProps } from './IQpTelephoneDirectoryAppProps';
import { getAllEmployees } from '../services/QpTelephoneDirectoryServices';
import { Employees } from '../entities/IEmployees';

const MainWrapper = styled.div`
	padding: 1rem;
`;

export const QpTelephoneDirectoryApp: FC<IQpTelephoneDirectoryAppProps> = props => {

	const [loading, setLoading] = useState<boolean>(true);
	const [employees, setEmployees] = useState<Employees[]>(undefined);

	useEffect(() => {
		getAllEmployees().then((items: Employees[]) => {
			setEmployees(items);
			setLoading(false);
		});
	}, []);

	return (
		<MainWrapper>
			{employees && <GridComponent
				dataSource={employees}
				enableHover={false}
				allowSelection={true}
				allowPaging={true}
				allowFiltering={true}
				allowSorting={true}
			>
				<ColumnsDirective>
					<ColumnDirective field="EMPLOYEE_ID" headerText="ID" />
					<ColumnDirective field="FIRST_NAME" headerText="First Name" />
					<ColumnDirective field="LAST_NAME" headerText="Last Name" />
					<ColumnDirective field="FULL_NAME" headerText="Full Name" />
					<ColumnDirective field="EMAIL" headerText="Email" />
				</ColumnsDirective>
				<Inject services={[Page, Filter, Sort, Selection]} />
			</GridComponent>}
		</MainWrapper>
	);
};

export default QpTelephoneDirectoryApp;
