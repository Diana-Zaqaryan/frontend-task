import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {User} from '../../../utils/models/user.model';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserInfoComponent} from '../user-info/user-info.component';
import {BankAccount} from '../../../utils/models/bank-account.model';
import {NumberTransformPipe} from '../../pipes/number-transform.pipe';

@Component({
  selector: 'app-system',
  imports: [FormsModule, CommonModule, UserInfoComponent,TranslateModule, NumberTransformPipe],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss',
  standalone: true
})
export class SystemComponent implements OnInit{
  public userData!: User;
  public bankAccounts!: BankAccount[];
  public additionalData: any;
  public transactions: any;
  public isLoading: boolean = true;
  public searchTerm: string = '';
  public accountColor: string = '';

  public accountVisibility: { [key: string]: boolean } = {};
  public balanceVisibility: { [key: string]: boolean } = {};

  public companiesData = [
    {
      companyName: 'Optecsys Plus',
      companyType: 'LLC',
      position: 'Owner'
    },
    {
      companyName: 'TechFusion Ltd.',
      companyType: 'Private Limited',
      position: 'CEO'
    },
    {
      companyName: 'Global Innovations Inc.',
      companyType: 'Corporation',
      position: 'Founder'
    },
    {
      companyName: 'Blue Horizon Solutions',
      companyType: 'LLC',
      position: 'Co-Founder'
    },
    {
      companyName: 'NextGen Technologies',
      companyType: 'Private Limited',
      position: 'Managing Director'
    },
    {
      companyName: 'FutureTech Enterprises',
      companyType: 'Corporation',
      position: 'CTO'
    },
    {
      companyName: 'Bright Minds Consulting',
      companyType: 'LLC',
      position: 'Lead Consultant'
    },
    {
      companyName: 'GreenTech Innovations',
      companyType: 'Corporation',
      position: 'Product Manager'
    },
    {
      companyName: 'Digital Solutions Group',
      companyType: 'Private Limited',
      position: 'Business Development Manager'
    },
    {
      companyName: 'SmartWorks Global',
      companyType: 'LLC',
      position: 'Chief Strategy Officer'
    }
  ];



  constructor(private httpService: HttpService,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService,) {}

  public ngOnInit() {
    const token = this.authService.getToken();
    if (!token) return;

    forkJoin({
      userData: this.httpService.getUserData(token),
      bankAccounts: this.httpService.getBankAccount(token),
      additionalData: this.httpService.getAdditionalData(token),
      transactions: this.httpService.getTransactions(token)
    }).subscribe({
      next: (result: any) => {
        this.userData = result.userData?.result;
        this.bankAccounts = result.bankAccounts?.result;
        this.additionalData = result.additionalData?.result;
        this.transactions = result.transactions?.result;
        this.accountColor = this.getRandomColor();
        console.log(this.additionalData)
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });



  }


  public onSearch(): void {
    console.log('Search :', this.searchTerm);
  }
  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  public getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleAccountVisibility(accountNumber: string) {
    this.accountVisibility[accountNumber] = !this.accountVisibility[accountNumber];
  }

  toggleBalanceVisibility(accountNumber: string) {
    this.balanceVisibility[accountNumber] = !this.balanceVisibility[accountNumber];
  }

}
