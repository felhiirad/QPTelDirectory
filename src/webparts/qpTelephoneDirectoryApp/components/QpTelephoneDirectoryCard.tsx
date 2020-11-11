import * as React from 'react';
import '../../styles/Card.css';
import { Employees } from '../../entities/IEmployees';

export interface IEmployeeCardProps {
  employee: Employees;
  siteUrl: string;
  hover: boolean;
}

export interface IEmployeeCardState {

}

class EmployeeCard extends React.Component<IEmployeeCardProps, IEmployeeCardState>{
    public render() {
        return (<div className='control-pane'>
                <div className="sample_container card_sample">

                    <div className="e-card e-custom-card">
                        <div className="e-card-header">

                            <div className="e-avatar e-avatar-circle e-avatar-xlarge">
                                <img src="https://ej2.syncfusion.com/react/demos/src/avatar/images/pic02.png" alt="profile_pic"/>
                            </div>
                            &nbsp;
                    </div>
                        <div className="e-card-header">
                            <div className="e-card-header-caption center">
                                <div className="e-card-header-title name">Laura Callahan</div>
                                <div className="e-card-sub-title">Sales Coordinator</div>
                            </div>
                        </div>
                        <div className="e-card-content">
                                <p className="avatar-content"> Laura received a BA in psychology from the University of Washington. She has also completed a course in business French. She reads and writes French.</p>
                        </div>
                    </div>
                </div>


            </div>);
    }
}

export default EmployeeCard;


// import * as React from 'react';
// import { HoverCard, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
// import { createListItems, IExampleItem } from '@uifabric/example-data';
// import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

// const classNames = mergeStyleSets({
//   compactCard: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   expandedCard: {
//     padding: '16px 24px',
//   },
//   item: {
//     selectors: {
//       '&:hover': {
//         textDecoration: 'underline',
//         cursor: 'pointer',
//       },
//     },
//   },
// });

// const items: IExampleItem[] = createListItems(10);

// const buildColumn = (): IColumn[] => {
//   return buildColumns(items).filter(column => column.name === 'location' || column.name === 'key');
// };

// const onRenderCompactCard = (item: IExampleItem): JSX.Element => {
//   return (
//     <div className={classNames.compactCard}>
//       <a target="_blank" href={`http://wikipedia.org/wiki/${item.location}`}>
//         {item.location}
//       </a>
//     </div>
//   );
// };

// const columns: IColumn[] = buildColumn();

// const onRenderExpandedCard = (item: IExampleItem): JSX.Element => {
//   return (
//     <div className={classNames.expandedCard}>
//       {item.description}
//       <DetailsList setKey="expandedCardSet" items={items} columns={columns} />
//     </div>
//   );
// };

// const onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
//   const expandingCardProps: IExpandingCardProps = {
//     onRenderCompactCard: onRenderCompactCard,
//     onRenderExpandedCard: onRenderExpandedCard,
//     renderData: item,
//   };
//   if (column.key === 'location') {
//     return (
//       <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
//         <div className={classNames.item}>{item.location}</div>
//       </HoverCard>
//     );
//   }
//   return item[column.key as keyof IExampleItem];
// };

