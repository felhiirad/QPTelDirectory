import * as React from "react";
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { Employees } from '../entities/IEmployees';
import '../../styles/EmployeeProfile_style.css';

export interface IQpTelephoneDirectoryDetailsProps{
  hideDialog: boolean;
  employee: Employees;
}
export interface IQpTelephoneDirectoryDetailsState{
  hideDialog: boolean;
  employee?: Employees;
}

class QpTelephoneDirectoryDetails extends React.Component<IQpTelephoneDirectoryDetailsProps, IQpTelephoneDirectoryDetailsState> {
    private buttons: ButtonPropsModel[];

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

    public componentWillReceiveProps(nextProps) {
      this.setState({hideDialog: nextProps.hideDialog, employee: nextProps.employee});
    }

    public render() {
      const { hideDialog, employee } = this.state;
      return (
        <div id='dialog-target'>
          {employee && <DialogComponent width='90%' isModal={true} header="Employee Details" showCloseIcon={true} buttons={this.buttons} target='#dialog-target' visible={hideDialog} close={this.dialogClose} overlayClick={this.onOverlayClick}>
            <div className="dialogContent">
              <div className="fullcontainer">

                <div className="bodyprofilecontainer">
                  <div className="leftprofilecontainer">
                    <div className="photo">
                      <img src={require('../../assets/34189.jpg')} width="100" height="133" alt="Employee Photo" />
                    </div>

                    <div className="employeebox">
                      <div className="employeename">{employee.Full_Name}</div>
                      <div className="employeefontdefault">{employee.Acting_Position}</div>
                      <div className="actingposition">{employee.Acting_Position_Department}</div>
                      <div className="employeefontdefault">Information and Communication Technology • Information System</div>


                      <div className="employeeaway">The employee is away :</div>
                      <div className="employeefontdefault">5/03/2020 - 19/03/2020, acting staff is <a href="">CHRISTIAN PARAS SAN JUAN, ITI/59</a></div>
                      <div className="employeefontdefault">20/03/2020 - 21/03/2020, acting staff is <a href="">MOHAMMED RAZI YASIR, ITI/511</a></div>
                    </div>

                  </div>
                  <hr />
                  <div className="contactmecontainer">
                    <div className="profiletitle">Contact me</div>

                    <div className="actionline">
                      <div className="small_icons"><a href={`mailto:${employee.Email}`}><img
                        src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                        alt={employee.Email} /></a></div>
                      <div className="contacttitle"><a href={`mailto:${employee.Email}`}>{employee.Email}</a></div>
                    </div>

                    <div className="actionline">
                      <div className="small_icons"><a href={`tel:${employee.Mobile_No}`}><img src={require('../../assets/icon_phone_normal.png')} width="30"
                        height="30" alt="phone" /></a></div>
                      <div className="contacttitle"><a href={`tel:${employee.Mobile_No}`}>{employee.Mobile_No}</a></div>
                    </div>

                    <div className="actionline">
                      <div className="small_icons"><a href=""><img src={require('../../assets/icon_chat_normal.png')} width="30" height="30"
                        alt="chat" /></a></div>
                      <div className="contacttitle"><a
                        href={`https://teams.microsoft.com/l/chat/0/0?users=${employee.Email}`}>Start a Chat</a>
                      </div>
                    </div>

                    <div className="actionline">
                      <div className="small_icons"><a href=""><img src={require('../../assets/icon_map_normal.png')} width="30" height="30"
                        alt="location map" /></a></div>
                      <div className="contacttitle"><a href="">{employee.Work_Location_Description}</a></div>
                    </div>


                  </div>



                  <div className="horizontalcontact">

                    <div className="horizontalborders">

                      <div className="contactbox">Direct Office Phone
        <div className="contactnumbers"><a href={`tel:${employee.Direct_Office_Phone}`}>{employee.Direct_Office_Phone}</a></div>

                      </div>

                      <div className="contactbox">Office Phone 1
        <div className="contactnumbers"><a href={`tel:${employee.Office_Phone_No_1}`}>{employee.Office_Phone_No_1}</a></div>

                      </div>

                      <div className="contactbox">Office Phone 2
        <div className="contactnumbers"><a href={`tel:${employee.Office_Phone_No_2}`}>{employee.Office_Phone_No_2}</a></div>

                      </div>

                      <div className="contactbox">Mobile Number
        <div className="contactnumbers"><a href={`tel:${employee.Mobile_No}`}>{employee.Mobile_No}</a></div>
                      </div>

                      <div className="contactbox">Office Fax
        <div className="contactnumbers"><a href={`tel:${employee.Fax_No}`}>{employee.Fax_No}</a></div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="supervisorbox">
                  <div className="supervisortitle">Supervisor</div>
                  <div className="supervisorgreybody">

                    <div className="supervisortitlecontainer">

                      <div className="supervisorphoto">
                        <img src={require('../../assets/37655.jpg')} width="100" height="133" alt="Employee Photo" />
                      </div>


                      <div className="supervisordetailsbox">
                        <div className="supervisorname">Francois Henri Ernest Guiberteau</div>
                        <div className="supervisorfontdefault">Asst. Manager</div>
                        <div className="supervisorfontdefault">Information Systems</div>
                        <div className="supervisorfontdefault">Information and Communication Technology</div>

                      </div>

                      <div>
                        <hr className="hrline" />
                      </div>

                      <div className="contactmecontainer">

                        <div className="actionline">
                          <div className="small_icons"><img src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                            alt="email" /></div>
                          <div className="contacttitle"><a href="mailto:guiberteau@qp.com.qa">guiberteau@qp.com.qa</a>
                          </div>
                        </div>

                        <div className="actionline">
                          <div className="small_icons"><img src={require('../../assets/icon_phone_normal.png')} width="30" height="30"
                            alt="phone" /></div>
                          <div className="contacttitle"><a href="tel:401-35377">401-35377</a></div>
                        </div>

                        <div className="actionline">
                          <div className="small_icons"><a href=""><img src={require('../../assets/icon_chat_normal.png')} width="30"
                            height="30" alt="chat" /></a></div>
                          <div className="contacttitle"><a
                            href="https://teams.microsoft.com/l/chat/0/0?users=guiberteau@qp.com.qa">Start a
              Chat</a></div>
                        </div>

                        <div className="actionline">
                          <div className="small_icons"><a href=""><img src={require('../../assets/icon_map_normal.png')} width="30"
                            height="30" alt="location map" /></a></div>
                          <div className="contacttitle"><a href="">Room 0439, Navigation Tower, Doha</a></div>
                        </div>


                      </div>


                    </div>




                  </div>



                </div>
                <div className="subordinatesbox">
                  <div className="supervisortitle">Subordinates</div>
                  <div className="subordinatesgreybody">
                    <div className="subordinatestitlecontainer">

                      <table className="SPTable">
                        <thead>
                          <tr>
                            <th>Ref. I.D.&nbsp;</th>
                            <th>Name</th>
                            <th>Staff No.</th>
                            <th>Office Phone</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <td>
                              <div className="links"><a href="#">&laquo;</a> <a className="active" href="#">1</a> <a
                                href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                        <tbody>
                          <tr>
                            <td>ITI/59</td>
                            <td><a href="mailto:a_varma@qp.com.qa"><img src={require('../../assets/email_icon2.png')} width="15"
                              height="10" alt="a_varma@qp.com.qa" /></a>&nbsp;<a href="">Christian San
                Juan</a></td>
                            <td>24027</td>
                            <td><a href="tel:401-35243">401-35243</a></td>
                          </tr>
                          <tr>
                            <td>ITI/55</td>
                            <td><a href="mailto:sanjuan@qp.com.qa"><img src={require('../../assets/email_icon2.png')} width="15"
                              height="10" alt="sanjuan@qp.com.qa" /></a>&nbsp;<a href="">Appukuttan
                Thampan Devakumar Varma</a></td>
                            <td>19068</td>
                            <td><a href="tel:401-35394">401-35394</a></td>
                          </tr>
                          <tr>
                            <td>ITI/5</td>
                            <td><a href="mailto:maa_almahmoud@qp.com.qa"><img src={require('../../assets/email_icon2.png')}
                              width="15" height="10" alt="maa_almahmoud@qp.com.qa" /></a>&nbsp;<a
                                href="">Mansour Abdullatif Abdulla Zaid Al-Mahmoud</a></td>
                            <td>22169</td>
                            <td><a href="tel:401-35548">401-35548</a></td>
                          </tr>
                          <tr>
                            <td>ITI/53</td>
                            <td><a href="mailto:mr_almansouri@qp.com.qa"><img src={require('../../assets/email_icon2.png')}
                              width="15" height="10" alt="mr_almansouri@qp.com.qa" /></a>&nbsp;Mashel
              Rashid Saleh Aldham Al-Mansouri</td>
                            <td>25666</td>
                            <td>401-35416</td>
                          </tr>
                          <tr>
                            <td>ITI/58</td>
                            <td><a href="mailto:t_soliman@qp.com.qa"><img src={require('../../assets/email_icon2.png')} width="15"
                              height="10" alt="t_soliman@qp.com.qa" /></a>&nbsp;Tamer Farahat Soliman
              Soliman</td>
                            <td>29044</td>
                            <td>401-35145</td>
                          </tr>
                          <tr>
                            <td>ITI/54</td>
                            <td><a href="mailto:gillani@qp.com.qa"><img src={require('../../assets/email_icon2.png')} width="15"
                              height="10" alt="gillani@qp.com.qa" /></a>&nbsp;Badar Ali Shah Syed Gillani
            </td>
                            <td>27273</td>
                            <td>401-35259</td>
                          </tr>
                          <tr>
                            <td>ITI/54</td>
                            <td><a href="mailto:f_alhaddad@qp.com.qa"><img src={require('../../assets/email_icon2.png')} width="15"
                              height="10" alt="f_alhaddad@qp.com.qa" /></a>&nbsp;Fatema Yousef J E
              Al-Haddad</td>
                            <td>35613</td>
                            <td>401-35164</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
                <div id="footer"></div>

              </div>


            </div>
          </DialogComponent>}
        </div>);
    }
}
export default QpTelephoneDirectoryDetails;
