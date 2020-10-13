import * as React from "react";
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { Employees, Delegations } from '../entities/IEmployees';
import { getEmployeeSupervisor, getEmployeeSubordinates, getEmployeeLeaves, getEmployeeInfo } from '../services/QpTelephoneDirectoryServices';
import '../../styles/EmployeeProfile_style.css';

export interface IQpTelephoneDirectoryDetailsProps{
  hideDialog: boolean;
  employee: Employees;
  siteUrl: string;
}
export interface IQpTelephoneDirectoryDetailsState{
  hideDialog: boolean;
  employee: Employees;
  supervisor?: Employees;
  subordinates?: Employees[];
  leaves?: Delegations[];
}

class QpTelephoneDirectoryDetails extends React.Component<IQpTelephoneDirectoryDetailsProps, IQpTelephoneDirectoryDetailsState> {
    private buttons: ButtonPropsModel[];
    private grid: GridComponent;
    private filter: any = {
      type: 'Menu'
    };

    constructor(props) {
        super(props);
        this.state = {
            hideDialog: this.props.hideDialog,
            employee: this.props.employee
        };

        this.buttons = [{
          click: () => {
            this.setState({ hideDialog: false });
          },
          buttonModel: {
              isPrimary: true,
              content: 'Close'
          }
      }];
    }
    private onOverlayClick = () => {
      this.setState({ hideDialog: false });
    }

    private dialogClose = () => {
        this.setState({ hideDialog: false });
    }

    public componentDidMount() {

      if(this.state.employee != null){
        getEmployeeSupervisor(this.props.siteUrl, this.state.employee.Supervisor_ID).then(res => {
          this.setState({supervisor: res != null ? res[0] : null});
        });

        getEmployeeSubordinates(this.props.siteUrl, this.state.employee.Staff_No).then(res => {
          this.setState({subordinates: res});
        });

        getEmployeeLeaves(this.props.siteUrl, this.state.employee.Staff_No).then(res => {
          this.setState({leaves: res});
        });
      }
    }

    public componentWillReceiveProps(nextProps) {

      this.setState({hideDialog: nextProps.hideDialog, employee: nextProps.employee});

      if(this.state.employee != null){
        getEmployeeSupervisor(this.props.siteUrl, this.state.employee.Supervisor_ID).then(res => {
          this.setState({supervisor: res != null ? res[0] : null});
        });

        getEmployeeSubordinates(this.props.siteUrl, this.state.employee.Staff_No).then(res => {
          this.setState({subordinates: res});
        });

        getEmployeeLeaves(this.props.siteUrl, this.state.employee.Staff_No).then(res => {
          this.setState({leaves: res});
        });
      }
    }

    private nameTemplate = (employee): any => {
      return(
        <>
          <a href={`mailto:${employee.Email}`}>
            <img src={require('../../assets/email_icon2.png')} width="15" height="10" alt="a_varma@qp.com.qa" />
          </a>
          <a href="">{employee.Full_Name}</a>
        </>
      );
    }

    public render() {
      const { hideDialog, employee, supervisor, subordinates, leaves } = this.state;
      return (
        <div id='dialog-target'>
          {employee && <DialogComponent width='90%' isModal={true} header="Employee Details" showCloseIcon={true} buttons={this.buttons} target='#dialog-target' visible={hideDialog} close={this.dialogClose} overlayClick={this.onOverlayClick}>
            <div className="dialogContent">
              <div className="fullcontainer">

                <div className="bodyprofilecontainer">
                  <div className="leftprofilecontainer">
                    <div className="photo">
                      <img src={require('../../assets/avatar-male.png')} width="100" height="133" alt="Employee Photo" />
                    </div>

                    <div className="employeebox">
                      <div className="employeename">{employee.Full_Name}</div>
                      <div className="employeefontdefault">{employee.Acting_Position}</div>
                      <div className="actingposition">{employee.Acting_Position_Department}</div>
                      <div className="employeefontdefault">{employee.Department}</div>


                      <div className="employeeaway">The employee is away :</div>
                      {/* {leaves && leaves.map(leave => (
                        <div className="employeefontdefault">{leave.Delegate_Start_Date} - {leave.Delegate_End_Date}, acting staff is <a href="">{leave.Delegate.Full_Name}, {leave.Delegate.Reference_Indicator}</a></div>
                      ))
                      } */}
                      <div className="employeefontdefault">5/03/2020 - 19/03/2020, acting staff is <a href="">CHRISTIAN PARAS SAN JUAN, ITI/59</a></div>
		                  <div className="employeefontdefault">20/03/2020 - 21/03/2020, acting staff is <a href="">MOHAMMED RAZI YASIR, ITI/511</a></div>
                    </div>

                  </div>
                  <hr />
                  <div className="contactmecontainer">
                    <div className="profiletitle">Contact me</div>
                    {employee.Email && <div className="actionline">
                      <div className="small_icons"><a href={`mailto:${employee.Email}`}><img
                        src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                        alt={employee.Email} /></a></div>
                      <div className="contacttitle"><a href={`mailto:${employee.Email}`}>{employee.Email}</a></div>
                    </div>}

                    {employee.Mobile_No && <div className="actionline">
                      <div className="small_icons"><a href={`tel:${employee.Mobile_No}`}><img src={require('../../assets/icon_phone_normal.png')} width="30"
                        height="30" alt="phone" /></a></div>
                      <div className="contacttitle"><a href={`tel:${employee.Mobile_No}`}>{employee.Mobile_No}</a></div>
                    </div>}

                    {employee.Email && <div className="actionline">
                      <div className="small_icons"><a href=""><img src={require('../../assets/icon_chat_normal.png')} width="30" height="30"
                        alt="chat" /></a></div>
                      <div className="contacttitle"><a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${employee.Email}`}>Start a Chat</a>
                      </div>
                    </div>}

                    {employee.Work_Location_Description && <div className="actionline">
                      <div className="small_icons"><a href=""><img src={require('../../assets/icon_map_normal.png')} width="30" height="30"
                        alt="location map" /></a></div>
                      <div className="contacttitle"><a href="">{employee.Work_Location_Description}</a></div>
                    </div>}
                  </div>
                  <div className="horizontalcontact">
                    <div className="horizontalborders">
                      {employee.Direct_Office_Phone && <div className="contactbox">Direct Office Phone
                        <div className="contactnumbers"><a href={`tel:${employee.Direct_Office_Phone}`}>{employee.Direct_Office_Phone}</a></div>
                      </div>}

                      {employee.Office_Phone_No_1 && <div className="contactbox">Office Phone 1
                        <div className="contactnumbers"><a href={`tel:${employee.Office_Phone_No_1}`}>{employee.Office_Phone_No_1}</a></div>
                      </div>}

                      {employee.Office_Phone_No_2 && <div className="contactbox">Office Phone 2
                        <div className="contactnumbers"><a href={`tel:${employee.Office_Phone_No_2}`}>{employee.Office_Phone_No_2}</a></div>
                      </div>}

                      {employee.Mobile_No && <div className="contactbox">Mobile Number
                        <div className="contactnumbers"><a href={`tel:${employee.Mobile_No}`}>{employee.Mobile_No}</a></div>
                      </div>}

                      {employee.Fax_No && <div className="contactbox">Office Fax
                        <div className="contactnumbers"><a href={`tel:${employee.Fax_No}`}>{employee.Fax_No}</a></div>
                      </div>}
                    </div>
                  </div>
                </div>
                {supervisor && <div className="supervisorbox">
                  <div className="supervisortitle">Supervisor</div>
                  <div className="supervisorgreybody">

                    <div className="supervisortitlecontainer">

                      <div className="supervisorphoto">
                        <img src={require('../../assets/avatar-male.png')} width="100" height="133" alt="Employee Photo" />
                      </div>


                      <div className="supervisordetailsbox">
                        <div className="supervisorname">{supervisor.Full_Name}</div>
                        <div className="supervisorfontdefault">{supervisor.Acting_Position}</div>
                        <div className="supervisorfontdefault">{supervisor.Acting_Position_Department}</div>
                        <div className="supervisorfontdefault">{supervisor.Department}</div>

                      </div>

                      <div>
                        <hr className="hrline" />
                      </div>

                      <div className="contactmecontainer">

                      {supervisor.Email && <div className="actionline">
                          <div className="small_icons"><img src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                            alt="email" /></div>
                          <div className="contacttitle"><a href={`mailto:${supervisor.Email}`}>{supervisor.Email}</a>
                          </div>
                        </div>}

                        {supervisor.Mobile_No && <div className="actionline">
                          <div className="small_icons"><img src={require('../../assets/icon_phone_normal.png')} width="30" height="30"
                            alt="phone" /></div>
                          <div className="contacttitle"><a href={`tel:${supervisor.Mobile_No}`}>{supervisor.Mobile_No}</a></div>
                        </div>}

                        {supervisor.Email && <div className="actionline">
                          <div className="small_icons"><a href=""><img src={require('../../assets/icon_chat_normal.png')} width="30"
                            height="30" alt="chat" /></a></div>
                          <div className="contacttitle"><a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${supervisor.Email}`}>Start a Chat</a></div>
                        </div>}

                        {supervisor.Work_Location_Description && <div className="actionline">
                          <div className="small_icons"><a href=""><img src={require('../../assets/icon_map_normal.png')} width="30"
                            height="30" alt="location map" /></a></div>
                          <div className="contacttitle"><a href="">{supervisor.Work_Location_Description}</a></div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>}
                {subordinates && employee.Subordinate_Display == "Y" && <div className="subordinatesbox">
                  <div className="supervisortitle">Subordinates</div>
                  <div className="subordinatesgreybody">
                    <div className="subordinatestitlecontainer">
                      <GridComponent
                        dataSource={subordinates}
                        enableHover={false}
                        ref={(g) => { this.grid = g; }}
                        allowSelection={true}
                        allowPaging={true}
                        filterSettings={this.filter}
                        allowFiltering={true}
                        allowSorting={true}
                      >
                        <ColumnsDirective>
                        <ColumnDirective field="Reference_Indicator" headerText="Ref. I.D." clipMode='EllipsisWithTooltip' />
                          <ColumnDirective headerText="Name" clipMode='EllipsisWithTooltip' template={this.nameTemplate} />
                          <ColumnDirective field="Staff_No" headerText="Staff No." clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
                          <ColumnDirective field="Office_Phone_No_1" headerText="Office Phone" clipMode='EllipsisWithTooltip' />
                        </ColumnsDirective>
                        <Inject services={[Page, Filter, Sort, Selection]} />
                      </GridComponent>
                    </div>
                  </div>
                </div>}
                <div id="footer"></div>
              </div>
            </div>
          </DialogComponent>}
        </div>);
    }
}
export default QpTelephoneDirectoryDetails;