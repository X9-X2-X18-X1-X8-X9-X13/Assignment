import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from './book.model'; 

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [FormsModule, NgIf, NgClass],
  standalone: true
})

export class AddBookComponent {
  newBook: Book = {
    title: '',
    author: '',
    publicationDate: '',
    imageUrl: ''
  };
  addBookForm: boolean = false;
  @Output() bookAdded = new EventEmitter<any>();

   addBook() {
    this.bookAdded.emit(this.newBook)
    this.closeAddBookForm();
  }

  openAddBookForm() {
    const token = localStorage.getItem('token'); 
    if (!token) {
        alert('You need to login first');
        return; // Stop the function if not logged in
    }
    this.addBookForm = true
  }

  closeAddBookForm() {
    this.addBookForm = false;
    }
}
