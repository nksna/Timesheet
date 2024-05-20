import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'management'
})
export class ManagementPipe implements PipeTransform {

  transform(companies: any[], search: string): any[] {
    if (!companies) return [];
    if (!search) return companies;

    search = search.toLowerCase();

    return companies.filter(company => 
      company.companyName.toLowerCase().includes(search) ||
      company.hrContact.toLowerCase().includes(search)
    );
  }
}


