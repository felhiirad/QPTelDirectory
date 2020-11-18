import * as React from 'react';
import { HoverCard, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Employees } from '../../entities/IEmployees';

const classNames = mergeStyleSets({
  compactCard: {
    height: '100%',
    padding: '10px'
  },
  expandedCard: {
    padding: '16px 24px',
  },
  photoCard: {
    position: 'relative',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    margin: '5px 15px 10px 5px',
    borderRadius: '50%',
    display: 'inline-block',
    selectors: {
      'img': {
        width: '100%',
        height: 'auto'
      }
    }
  },
  employeeBoxCard: {
    maxWidth: '200px',
    display: 'inline-block',
    position: 'absolute',
    paddingTop: '10px'
  }
});


const onError = (event) => {
  event.target.src = require('../../assets/avatar-male.png');
};

const onRenderCompactCard = (data: IEmployeeCardProps): JSX.Element => {
  return (
    <div className={classNames.compactCard}>
      <div className={classNames.photoCard}>
        {data.employee.Gender == 'M' && <img width="50" src={"/sites" + data.siteUrl.split("/sites")[1] + "/Employee%20Photos/" + data.employee.Staff_No + ".jpg"} onError={onError} />}
        {data.employee.Gender == 'F' && <img width="50" src={require('../../assets/avatar-female.png')} />}
      </div>

      <div className={classNames.employeeBoxCard}>
        <div className="employeename">{data.employee.Full_Name}</div>
        <div className="employeefontdefault">{data.employee.Position}</div>
        <div className="employeefontdefault">{data.employee.Department}</div>
      </div>
    </div>
  );
};


const onRenderExpandedCard = (data: IEmployeeCardProps): JSX.Element => {
  return (
    <div className={classNames.expandedCard}>
      <div className="profiletitle">Contact me</div>
                  {data.employee.Email && <div className="actionline">
                    <div className="small_icons"><a href={`mailto:${data.employee.Email}`}><img
                      src={require('../../assets/icon_mail_normal.png')} width="30" height="30"
                      alt={data.employee.Email} /></a></div>
                    <div className="contacttitle"><a href={`mailto:${data.employee.Email}`}>{data.employee.Email}</a></div>
                  </div>}

                  {data.employee.Mobile_No && <div className="actionline">
                    <div className="small_icons"><a href={`tel:${data.employee.Mobile_No}`}><img src={require('../../assets/icon_phone_normal.png')} width="30"
                      height="30" alt="phone" /></a></div>
                    <div className="contacttitle"><a href={`tel:${data.employee.Mobile_No}`}>{data.employee.Mobile_No}</a></div>
                  </div>}

                  {data.employee.Email && <div className="actionline">
                    <div className="small_icons"><a href=""><img src={require('../../assets/icon_chat_normal.png')} width="30" height="30"
                      alt="chat" /></a></div>
                    <div className="contacttitle"><a
                      href={`https://teams.microsoft.com/l/chat/0/0?users=${data.employee.Email}`}>Start a Chat</a>
                    </div>
                  </div>}

                  {data.employee.Work_Location_Description && <div className="actionline">
                    <div className="small_icons"><a href=""><img src={require('../../assets/icon_map_normal.png')} width="30" height="30"
                      alt="location map" /></a></div>
                    <div className="contacttitle"><a href="">{data.employee.Work_Location_Description}</a></div>
                  </div>}
    </div>
  );
};

export interface IEmployeeCardProps {
  employee: Employees;
  siteUrl: string;
}

export interface IEmployeeCardState {

}

class EmployeeCard extends React.Component<IEmployeeCardProps, IEmployeeCardState>{

  private expandingCardProps: IExpandingCardProps = {
    onRenderCompactCard: onRenderCompactCard,
    onRenderExpandedCard: onRenderExpandedCard,
    renderData: this.props,
    expandedCardHeight: 250,
    compactCardHeight: 140
  };

  public render() {
    return (
      <HoverCard expandingCardProps={this.expandingCardProps} instantOpenOnClick={true}>
          {this.props.children}
      </HoverCard>
    );
  }
}

export default EmployeeCard;
