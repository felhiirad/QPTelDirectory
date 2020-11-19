import React, { FC, useState, useEffect, useCallback } from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QpTelephoneDirectoryWhosWhoWebPartStrings';
import QpTelephoneDirectoryWhosWho from './components/QpTelephoneDirectoryWhosWho';
import { IQpTelephoneDirectoryWhosWhoProps } from './components/IQpTelephoneDirectoryWhosWhoProps';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { getAllEmployees } from '../services/QpTelephoneDirectoryServices';
import { Employees } from '../entities/IEmployees';
import { getActualProperties } from '@syncfusion/ej2-react-grids';

export interface IQpTelephoneDirectoryWhosWhoWebPartProps {
  description: string;
  departments: any;
  SelectedDepartment: string;
}

export default class QpTelephoneDirectoryWhosWhoWebPart extends BaseClientSideWebPart<IQpTelephoneDirectoryWhosWhoWebPartProps> {
  private dropdownOptions: IPropertyPaneDropdownOption[];
  private listsFetched: boolean = false;

  // protected onPropertyPaneConfigurationStart(): void {
  //   // loads list name into list dropdown
  //   if (!this.listsFetched) {
  //     this.fetchDepartmentOptions().then((response) => {
  //       this.dropdownOptions = response;
  //       this.listsFetched = true;
  //       // now refresh the property pane, now that the promise has been resolved..
  //       this.onDispose();
  //     });
  //   }
  // }

  public render(): void {
    const element: React.ReactElement<IQpTelephoneDirectoryWhosWhoProps> = React.createElement(

      QpTelephoneDirectoryWhosWho,
      {
        description: this.properties.description,
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        selectedDepartment: this.properties.SelectedDepartment //anis
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onInit(): Promise<void> {
  //   this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Department selection");
  //   return super.onInit();
  // }


  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'Departments' && newValue) {
      this.properties.SelectedDepartment = newValue;
      // // push new list value
      // super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // // refresh the item selector control by repainting the property pane
      // this.context.propertyPane.refresh();
      // // re-render the web part as clearing the loading indicator removes the web part body
      // this.render();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
  }

  // protected onPropertyChange(propertyPath: string, newValue: any): void {
  //   if (propertyPath === "Departments") {
  //     // Change only when drop down changes
  //     //super.onPropertyChange(propertyPath, newValue);
  //     // Clears the existing data
  //     this.properties.departments = undefined;
  //     this.onPropertyChange('Departments', this.properties.departments);
  //     // Get/Load new items data
  //     // this.GetItems();
  //   }
  //   else {
  //     // Render the property field
  //     //super.onPropertyChange(propertyPath, newValue);
  //   }
  // }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //anis
  //protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }



  private async fetchDepartmentOptions(): Promise<Array<IPropertyPaneDropdownOption>> {
    var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    this.properties.departments = await getAllEmployees(this.context.pageContext.web.absoluteUrl).then((items: Employees[]) => {
      options.push({ key: '1', text: 'All' }); var key = 2;
      for (var emp of items) {
        if (options.find(e => e.text == emp.Department) == undefined) {
          options.push({ key: `${key}`, text: emp.Department });
          key++;
        }
      }
    });
    return options;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (!this.listsFetched) {
      this.fetchDepartmentOptions().then((response) => {
        this.dropdownOptions = response;
        this.listsFetched = true;
        // now refresh the property pane, now that the promise has been resolved..
        this.onDispose();
      });
    }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('Departments', {
                  label: 'Departments',
                  options: this.dropdownOptions
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
