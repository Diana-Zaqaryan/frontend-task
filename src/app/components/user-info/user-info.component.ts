import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() options: any[] = [];
  public isDropdownOpen = false;
  public isCountryType: boolean = false;


  public ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.options.length) {
      this.isCountryType = this.checkIfCountryType(this.options);
    }
  }

  private checkIfCountryType(options: any[]): boolean {
    return options.length > 0 && options[0].hasOwnProperty('countryCode');
  }

  public toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectOption(option: any) {
    this.isDropdownOpen = false;
  }

  closeDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = false;
  }
}
