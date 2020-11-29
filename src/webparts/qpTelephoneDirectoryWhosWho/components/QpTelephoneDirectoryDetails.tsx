import * as React from "react";
import moment from 'moment';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Filter, Selection } from '@syncfusion/ej2-react-grids';
import { Employees, Delegations } from '../../entities/IEmployees';
import { getEmployeeInfo, getEmployeeSubordinates, getEmployeeLeaves } from '../../services/QpTelephoneDirectoryServices';
import '../../styles/EmployeeProfile_style.css';
import { listPage } from "../../constants/lists";
import { titleCase } from "../../tools/StringFormatter";

export interface IQpTelephoneDirectoryDetailsProps {
  hideDialog: boolean;
  employee: Employees;
  siteUrl: string;
  clearData();
}
export interface IQpTelephoneDirectoryDetailsState {
  hideDialog: boolean;
  employee: Employees;
  supervisor?: Employees;
  subordinates?: Employees[];
  leaves?: Delegations[];
  empPhoto?: string;
  supervisorPhoto?: string;
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
    this.props.clearData();
  }

  private dialogClose = () => {
    this.setState({ hideDialog: false });
    this.props.clearData();
  }

  public componentDidMount() {
    if (this.props.employee != null) {
      getEmployeeInfo(this.props.siteUrl, this.props.employee.Supervisor_ID).then(res => {
        this.setState({ supervisor: res });
      });

      getEmployeeSubordinates(this.props.siteUrl, this.props.employee.Staff_No).then(res => {
        this.setState({ subordinates: res });
      });

      getEmployeeLeaves(this.props.siteUrl, this.props.employee.Staff_No).then(res => {
        this.setState({ leaves: res });
      });

      this.setState({ hideDialog: this.props.hideDialog, employee: this.props.employee });
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.employee != null) {
      getEmployeeInfo(this.props.siteUrl, nextProps.employee.Supervisor_ID).then(res => {
        this.setState({ supervisor: res });
      });

      getEmployeeSubordinates(this.props.siteUrl, nextProps.employee.Staff_No).then(res => {
        this.setState({ subordinates: res });
      });

      getEmployeeLeaves(this.props.siteUrl, nextProps.employee.Staff_No).then(res => {
        this.setState({ leaves: res });
      });

      this.setState({ hideDialog: nextProps.hideDialog, employee: nextProps.employee });
    }
  }

  private nameTemplate = (employee): any => {
    return (
      <>
        <a className="subordonatemail" href={`mailto:${employee.Email}`}>
          <img src={require('../../assets/email_icon2.png')} width="15" height="10" alt={employee.Email} />
        </a>
        <a onClick={() => open(`${this.props.siteUrl}/SitePages/${listPage.detailsEmployee}?staffNo=${employee.Staff_No}`)}>
          {titleCase(employee.Full_Name)}
        </a>
      </>
    );
  }

  public onError = (event) => {
    event.target.src = require('../../assets/avatar-male.png');
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
                    {employee.Gender == 'M' && <img width="50" src={"/sites" + this.props.siteUrl.split("/sites")[1] + "/Employee%20Photos/" + employee.Staff_No + ".jpg"} onError={this.onError} />}
                    {employee.Gender == 'F' && <img width="50" src={require('../../assets/avatar-female.png')} />}
                  </div>

                  <div className="employeebox">
                    <div className="employeename">{titleCase(employee.Full_Name)}</div>
                    <div className="employeefontdefault">{"Staff No. " + employee.Staff_No + " "}{employee.Reference_Indicator && <span>&#8226; </span>}{employee.Reference_Indicator}</div>
                    <div className="employeefontdefault">{titleCase(employee.Position) + " "}{employee.Section && <span>&#8226; </span>}{titleCase(employee.Section)}</div>
                    <div className="actingposition">{employee.Acting_Position ? titleCase(employee.Acting_Position) + ", " : ""}{employee.Acting_Position_Department ? titleCase(employee.Acting_Position_Department) + ", " : ""}{employee.Acting_Reference_Indicator}</div>
                    <div className="employeefontdefault">{titleCase(employee.Department) + " "}{employee.Division && <span>&#8226; </span>}{titleCase(employee.Division)}</div>

                    {leaves && leaves.length > 0 && <div className="employeeaway">The employee is away :</div>}
                    {leaves && leaves.length > 0 && leaves.map(leave => (
                      <div className="employeefontdefault">{moment(leave.Delegate_Start_Date).format('DD/MM/YYYY')} - {moment(leave.Delegate_End_Date).format('DD/MM/YYYY')}, acting staff is <a onClick={() => open(`${this.props.siteUrl}/SitePages/${listPage.detailsEmployee}?staffNo=${leave.Delegate.Staff_No}`)}>{titleCase(leave.Delegate.Full_Name)}, {leave.Delegate.Reference_Indicator}</a></div>
                      ))
                    }
                  </div>
                </div>
                <hr />
                <div className="contactmecontainer">
                  <div className="profiletitle">Contact me</div>
                  {employee.Email && <div className="actionline">
                    <div className="small_icons"><a href={`mailto:${employee.Email}`}><img
                      src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                      alt={employee.Email} /></a></div>
                    <div className="contacttitle"><a href={`mailto:${employee.Email}`}>{employee.Email ? employee.Email.toLowerCase() : employee.Email}</a></div>
                  </div>}

                  {employee.Office_Phone_No_1 && <div className="actionline">
                    <div className="small_icons"><a href={`tel:${employee.Office_Phone_No_1}`}><img src={require('../../assets/icon_phone_normal.png')} width="30"
                      height="30" alt="phone" /></a></div>
                    <div className="contacttitle"><a href={`tel:${employee.Office_Phone_No_1}`}>{employee.Office_Phone_No_1}</a></div>
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
                    <div className="contacttitle"><a href="">{employee.Office_Room_No_x002e_ ? "Room " + employee.Office_Room_No_x002e_ + ", " : ""}{employee.Work_Location_Description ? titleCase(employee.Work_Location_Description) + ", " : ""}{titleCase(employee.Work_Location_City)}</a></div>
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
                      {supervisor.Gender == 'M' && <img width="50" src={"/sites" + this.props.siteUrl.split("/sites")[1] + "/Employee%20Photos/" + supervisor.Staff_No + ".jpg"} />}
                      {supervisor.Gender == 'F' && <img width="100" src={require('../../assets/avatar-female.png')} />}
                    </div>

                    <div className="supervisordetailsbox">
                    <div className="supervisorname"><a onClick={() => open(`${this.props.siteUrl}/SitePages/${listPage.detailsEmployee}?staffNo=${supervisor.Staff_No}`)}>{titleCase(supervisor.Full_Name)}</a></div>
                      <div className="supervisorfontdefault">{titleCase(supervisor.Position)}</div>
                      <div className="supervisorfontdefault">{titleCase(supervisor.Division)}</div>
                      <div className="supervisorfontdefault">{titleCase(supervisor.Department)}</div>
                    </div>

                    <div>
                      <hr className="hrline" />
                    </div>

                    <div className="contactmecontainer">
                      {supervisor.Email && <div className="actionline">
                        <div className="small_icons"><img src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                          alt="email" /></div>
                        <div className="contacttitle"><a href={`mailto:${supervisor.Email}`}>{supervisor.Email ? supervisor.Email.toLowerCase() : supervisor.Email}</a>
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
                        <div className="contacttitle"><a href="">{supervisor.Office_Room_No_x002e_ ? "Room " + supervisor.Office_Room_No_x002e_ + ", " : ""}{supervisor.Work_Location_Description ? titleCase(supervisor.Work_Location_Description) + ", " : ""}{titleCase(supervisor.Work_Location_City)}</a></div>
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
                        <ColumnDirective field="Reference_Indicator" headerText="Ref. I.D." width="100" clipMode='EllipsisWithTooltip' />
                        <ColumnDirective headerText="Name" clipMode='EllipsisWithTooltip' template={this.nameTemplate} />
                        <ColumnDirective field="Staff_No" headerText="Staff No." width="100" clipMode='EllipsisWithTooltip' isPrimaryKey={true} />
                        <ColumnDirective field="Office_Phone_No_1" headerText="Office Phone"  width="110" clipMode='EllipsisWithTooltip' />
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
