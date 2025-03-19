import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {onlyNumbersDirective} from '../../directives/only-numbers.directive';
import {CountryModel} from '../../../utils/models/country.model';
import {Router} from '@angular/router';
import {CustomSelectComponent} from '../custom-select/custom-select.component';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateService} from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
  imports: [FormsModule, CommonModule, onlyNumbersDirective, CustomSelectComponent, TranslateModule],
})
export class LoginComponent {
  public countries: CountryModel[] = [];
  public phoneNumber: string = '';
  public password: string = '';
  public selectedCountry: CountryModel = {countryCode: 374, countryName: "Armenia"};
  public isPasswordVisible: boolean = false;
  public isPhoneSendSuccess: boolean = false;
  public passwordVisible: boolean = false;

  constructor(private httpService: HttpService,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService,
              private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.setDefaultLang('en')
    this.httpService.getCountries().subscribe(
      (data: any) => {
        try {
          this.countries = data.result as CountryModel[];
        } catch (error) {
          console.error('Error processing countries:', error);
        }
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  public onCountryChange(country: CountryModel) {
    this.selectedCountry = country;
  }


  public next() {
    if (!this.selectedCountry) return;

    const sendValue = this.selectedCountry.countryCode + this.phoneNumber;
    this.httpService.checkPhone({username: sendValue}).subscribe(
      () => {
        this.isPhoneSendSuccess = true;
        this.isPasswordVisible = true;
      },
      (error) => {
        console.error('Error checking phone:', error);
      }
    );
  }

  public login() {
    if (!this.selectedCountry) return;
    const username = this.selectedCountry.countryCode + this.phoneNumber;
    try {
      this.httpService.login(username, this.password).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['system']);
          this.cdr.detectChanges()
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } catch (e: any) {
      console.log(e.message)
    }

  }

  public togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  public changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

}
