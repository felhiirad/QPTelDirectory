import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'QpTelephoneDirectoryWhosWhoWebPartStrings';
import QpTelephoneDirectoryWhosWho from './components/QpTelephoneDirectoryWhosWho';
import { IQpTelephoneDirectoryWhosWhoProps } from './components/IQpTelephoneDirectoryWhosWhoProps';
import { getAllEmployees } from '../services/QpTelephoneDirectoryServices';
import { Employees } from '../entities/IEmployees';

export interface IQpTelephoneDirectoryWhosWhoWebPartProps {
  description: string;
  selectedDepartment: string;
}

export default class QpTelephoneDirectoryWhosWhoWebPart extends BaseClientSideWebPart <IQpTelephoneDirectoryWhosWhoWebPartProps> {
  private departments: IPropertyPaneDropdownOption[];

  public render(): void {
    const element: React.ReactElement<IQpTelephoneDirectoryWhosWhoProps> = React.createElement(
      QpTelephoneDirectoryWhosWho,
      {
        description: this.properties.description,
        context: this.context,
        siteUrl : this.context.pageContext.web.absoluteUrl,
        selectedDepartment: this.properties.selectedDepartment
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private loadDepatments(): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise <IPropertyPaneDropdownOption[]> ((resolve) => {
      getAllEmployees(this.context.pageContext.web.absoluteUrl).then((items: Employees[]) => {
        var options = [];
        options.push({ key: 'All', text: 'All' });
        for (var emp of items) {
          if (options.find(e => e.text == emp.Department) == undefined) {
            options.push({ key: emp.Department, text: emp.Department });
          }
        }
        resolve(options);
      });
    });
  }

  protected onPropertyPaneConfigurationStart(): void {

    if (this.departments) {
      return;
    }

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    this.loadDepatments()
      .then((listOptions: IPropertyPaneDropdownOption[]): void => {
        this.departments = listOptions;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'selectedDepartment' && newValue) {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      this.context.propertyPane.refresh();
      this.render();
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneDropdown('selectedDepartment', {
                  label: "Departments",
                  options: this.departments
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
