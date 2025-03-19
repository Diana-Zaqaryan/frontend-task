import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {onlyNumbersDirective} from '../../directives/only-numbers.directive';
import {CountryModel} from '../../../utils/models/country.model';
import {Router} from '@angular/router';
import {CustomSelectComponent} from '../custom-select/custom-select.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule,ReactiveFormsModule, CommonModule, onlyNumbersDirective, CustomSelectComponent, TranslateModule],
})
export class LoginComponent {
  public countries: CountryModel[] = [];
  public phoneNumber: string = '';
  public password: string = '';
  public selectedCountry: CountryModel = {countryCode: 374, countryName: "Armenia"};
  public isPasswordVisible: boolean = false;
  public isPhoneSendSuccess: boolean = false;
  public passwordVisible: boolean = false;
  public loginForm!: FormGroup;

  constructor(private httpService: HttpService,
              private router: Router,
              private authService: AuthService,
              private translate: TranslateService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang('en');

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
    })
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

    const phoneNumber = this.selectedCountry.countryCode + this.loginForm.get('phone')?.value;
    this.httpService.checkPhone({username: phoneNumber}).subscribe( () => {
      this.isPhoneSendSuccess = true;
      this.isPasswordVisible = true;
      if (!this.loginForm.contains('password')) {
        this.loginForm.addControl('password', this.fb.control('', Validators.required));
      }
      }
    );
  }

  public login() {
    if (!this.selectedCountry) return;
    const username = this.selectedCountry.countryCode + this.loginForm.get('phone')?.value;
    const password = this.loginForm.get('password')?.value
    try {
      this.httpService.login(username, password).subscribe(
        (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['system']);
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
