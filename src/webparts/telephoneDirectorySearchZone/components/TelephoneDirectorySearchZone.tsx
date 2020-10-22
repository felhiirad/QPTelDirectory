import * as React from 'react';
import styled from 'styled-components';
import { ITelephoneDirectorySearchZoneProps } from './ITelephoneDirectorySearchZoneProps';

const SearchZone = styled.div`
  height: 35px;
  padding: 1rem;
  border: 5px solid #00456B;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const SearchText = styled.input`
  position: absolute;
  left: 29px;
  top: 36px;
  bottom: 5px;
  background: #f1f1f1;
  color: #000;
  border: none;
  padding: 5px;
  width: 80%;
  height: 24px;

  ::placeholder {
    font-style: italic;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  left: 75.5%;
  top: 36px;
  bottom: 5px;
  background: #37B08C;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 0px;
  color: #FFFEFE;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.25);
  border: none;
  width: 17.5%;
  height: 34px;
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

  public searchAction = () => {
    var url = `${this.props.siteUrl}/SitePages/Employee-Search.aspx?query=${this.state.searchText}`;
    const link = document.createElement('a');
    this.open(url);
  }

  public open = (url) => {
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
