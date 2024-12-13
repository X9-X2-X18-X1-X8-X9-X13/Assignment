import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditButtonComponent } from '../edit-button/edit-button.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-book-list',
  imports: [NgFor, AddBookComponent, EditButtonComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  standalone: true
})

export class BookListComponent {
  showAddBookForm: boolean = false;
  book_list: any
  constructor(private cdr: ChangeDetectorRef) {}

  loggedin(){
     const token = localStorage.getItem('token'); 
    if (!token) {
        alert('You need to login first');
        return; 
    }
  }
   ngOnInit() {
    try{
      this.fetchBooks()
      this.cdr.detectChanges();  // Manually trigger change detection
    }
    catch(err){
      console.log('error fetching book list', err)
    }
  }
  fetchBooks(){
    fetch('http://52.23.225.69/api/books')
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        // console.log('Successfuly retrieved books', data);
        this.book_list = data
      } else {
        const errorData = await response.json();
        console.log('couldnt retrieve books:', errorData.message);
      }
    }).catch((error) => {
      console.error('Error occurred:', error);
    });
  }

  // Adding Book
  addBookEvent(book: any){
    this.loggedin();
    const token = localStorage.getItem('token')
    fetch('http://52.23.225.69/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(book),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add the book');
      }
      // return response.json();
      this.fetchBooks()
    })
  };

  // Editing Book
  updateBook(book: any) {
    this.loggedin();
    const token = localStorage.getItem('token')

    fetch(`http://52.23.225.69/api/books/${book.bookId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(book)
  }).then(res => {
    console.log(res.json())
    if(res.ok)
      this.fetchBooks()
  }).catch(err => {
    console.log(err)
  })
  }

  // Deleting Book
  bookToDeleteId: number = 0

  saveBookId(id:number){
    this.bookToDeleteId = id
  }

  deleteBook(){
    this.loggedin();
    const token = localStorage.getItem('token')
    fetch(`http://52.23.225.69/api/books/${this.bookToDeleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete the book');
      }
      return response.text();
    })
    .then(() => {
      this.fetchBooks();
    })
    .catch((error) => {
      console.error('Error deleting quote:', error);
    });
  }
}
