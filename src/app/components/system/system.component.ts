import { Component } from '@angular/core';
import {forkJoin} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-system',
  imports: [],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss',
  standalone: true
})
export class SystemComponent {
  public userData: any;
  public bankAccounts: any;
  public additionalData: any;
  public transactions: any;
  public isLoading: boolean = true;

  constructor(private apiService: HttpService, private authService: AuthService) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (!token) return;

    forkJoin(this.apiService.getSystemData(token)).subscribe({
      next: ([userData, bankAccounts, additionalData, transactions]) => {
        this.userData = userData;
        this.bankAccounts = bankAccounts;
        this.additionalData = additionalData;
        this.transactions = transactions;
      },
      error: () => {},
      complete: () => (this.isLoading = false),
    });
  }
}
