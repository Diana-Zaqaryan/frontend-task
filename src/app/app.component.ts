import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingService} from './services/loading.service';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  public isLoading = false;

  constructor(private loadingService: LoadingService, private translate: TranslateService) {
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
      this.translate.setDefaultLang('en');
    });
  }

  public ngOnInit(): void {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.translate.use(storedLang);
    }
  }


}
