import * as React from 'react';
import styled from 'styled-components';
import { listPage } from '../../constants/lists';
import { ITelephoneDirectorySearchZoneProps } from './ITelephoneDirectorySearchZoneProps';
import { getEmployeeByQuery } from '../../services/QpTelephoneDirectoryServices';
import '../../styles//searchZone.css';

const SearchZone = styled.div`
  border: 3px solid #00456b;
  background: rgb(241, 241, 241);
  overflow: auto;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
`;

const SearchText = styled.input`
  border: 0px;
  width: 75%;
  padding: 10px;
  background: none;

  ::placeholder {
    font-style: italic;
  }

  &:focus {
    outline: 0;
  }
`;

const SearchButton = styled.button`
  border: 0px;
	background: none;
	background-color: #37B08C;
	color: #fff;
	float: right;
  padding: 10px;
  font-weight: bold;
	border-radius-top-right: 5px;
	-moz-border-radius-top-right: 5px;
	-webkit-border-radius-top-right: 5px;
	border-radius-bottom-right: 5px;
	-moz-border-radius-bottom-right: 5px;
	-webkit-border-radius-bottom-right: 5px;
  cursor:pointer;
`;

export interface ITelephoneDirectorySearchZoneState{
  searchText: string;
}

export default class TelephoneDirectorySearchZone extends React.Component<ITelephoneDirectorySearchZoneProps, ITelephoneDirectorySearchZoneState> {

  constructor(props){
    super(props);
    this.state = {
      searchText : ""
    };
  }

  private searchAction = (event) => {
    event.preventDefault();
    var url = '';

    getEmployeeByQuery(this.props.siteUrl, this.state.searchText).then((res) => {
      if(res.length == 1) {
        url = `${this.props.siteUrl}/SitePages/${listPage.detailsEmployee}?staffNo=${res[0].Staff_No}`;
      } else {
        url = `${this.props.siteUrl}/SitePages/${listPage.employeeSearch}?query=${this.state.searchText}`;
      }
      open(url);
    });
  }

  public render(): React.ReactElement<ITelephoneDirectorySearchZoneProps> {
    return (
      <div className="searchZone">
        <form>
          <input className="searchText" type="text" placeholder="People Search..." onChange={ val => this.setState({searchText: val.target.value}) } />
          <button className="searchButton" onClick={this.searchAction} >Search</button>
        </form>
      </div>
    );
  }
}
