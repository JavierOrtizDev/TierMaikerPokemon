import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator-controler',
  standalone: true,
  imports: [],
  templateUrl: './paginator-controler.component.html',
  styleUrl: './paginator-controler.component.css',
})
export class PaginatorControlerComponent {
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPrevious(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages - 1) {
      this, this.pageChange.emit(this.currentPage + 1);
    }
  }
}
