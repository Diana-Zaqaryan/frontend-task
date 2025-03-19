import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent{
  @Input() options: any[] = [];
  @Input() selectedOption!: any;
  @Output() selectionChange = new EventEmitter<any>();

  public isDropdownOpen = false;

  public toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectOption(option: any) {
    this.selectionChange.emit(option);
    this.isDropdownOpen = false;
  }

  public closeDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = false;
  }
}
