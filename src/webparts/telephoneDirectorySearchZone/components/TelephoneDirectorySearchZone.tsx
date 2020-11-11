import * as React from 'react';
import styled from 'styled-components';
import { listPage } from '../../constants/lists';
import { ITelephoneDirectorySearchZoneProps } from './ITelephoneDirectorySearchZoneProps';
import { getEmployeeByQuery } from '../../services/QpTelephoneDirectoryServices';
import { Employees } from '../../entities/IEmployees';


const SearchZone = styled.div`
  height: 35px;
  min-height: 35px;
  padding: 1rem;
  border: 5px solid #00456B;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const SearchText = styled.input`
  position: absolute;
  left: 5px;
  top: 5px;
  bottom: 5px;
  background: #f1f1f1;
  color: #000;
  border: none;
  padding: 5px;
  width: 80%;

  ::placeholder {
    font-style: italic;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  left: 82%;
  top: 5px;
  bottom: 5px;
  background: #37B08C;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 0px;
  color: #FFFEFE;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border: none;
  width: 17%;
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
      this.open(url);
    });
  }

  private open = (url) => {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }

  public render(): React.ReactElement<ITelephoneDirectorySearchZoneProps> {
    return (
      <SearchZone>
        <form>
          <SearchText type="text" placeholder="People Search..." onChange={ val => this.setState({searchText: val.target.value}) } />
          <SearchButton onClick={this.searchAction} >Search</SearchButton>
        </form>
      </SearchZone>
    );
  }
}
