import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './book.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css'],
  imports: [FormsModule, NgIf],
  standalone: true
})

export class EditButtonComponent {
  @Input() book: Book | null = null; // Accept the book object from the parent component
  @Output() bookEmitter = new EventEmitter<any>()

  isEditFormOpen = false; // Track if the edit form is open
  showModal: boolean = false;
  bookToEdit: Book = {
    bookId:0,
    title:'',
    author:'',
    publicationDate:'',
    imageUrl:''
  }

  submitEdit() {
    if (this.bookToEdit) {
      console.log('Updated book:', this.bookToEdit);
      this.bookEmitter.emit(this.bookToEdit); // Emit the updated book to parent
      this.showModal = false; // Close the modal after submission
    }
  }

  openEditModal() {
    if (this.book) {
      this.bookToEdit = { ...this.book }; // Create a copy of the book object
      this.showModal = true;
    }
  }
  
  closeEditModal() {
    this.showModal = false;
  }
  cancelEdit() {
    this.isEditFormOpen = false; // Close the form without saving
  }
}
