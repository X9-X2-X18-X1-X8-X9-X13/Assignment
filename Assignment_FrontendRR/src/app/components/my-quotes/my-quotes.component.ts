import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.css'],
  imports: [FormsModule, NgFor]
})

export class MyQuotesComponent {
  private modal: any;
  quoteToDelete: number | null = null; // Stores the ID of the quote to delete
  loggedin(){
    const token = localStorage.getItem('token'); // Retrieve the token
   if (!token) {
       alert('You need to login first');
       return; // Stop the function if not logged in
   }
 }

  quotes: { quoteId: number; text: string; author: string }[] = []; // Initialize as empty array
  fetchQuotes(){
    fetch('http://52.23.225.69/api/quotes')
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log('Successfuly retrieved quotes', data);
        this.quotes = data
      } else {
        const errorData = await response.json();
        console.log('couldnt retrieve quotes:', errorData.message);
      }
    }).catch((error) => {
      console.error('Error occurred:', error);
    });
  }
  ngOnInit() {
    // Get the modal element and create the modal instance only once
    const modalElement = document.getElementById('addQuoteModal') as HTMLElement;
    this.modal = new window.bootstrap.Modal(modalElement);
    this.fetchQuotes();
  }

  prepareToDelete(id: number) {
    this.quoteToDelete = id; // Store the ID of the quote to delete
  }

  deleteQuote() {
    this.loggedin();
    const token = localStorage.getItem('token')
    fetch(`http://52.23.225.69/api/quotes/${this.quoteToDelete}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the quote');
        }
        return response.text();
      })
      .then(() => {
        this.fetchQuotes();
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  }

  showAddQuoteModal() {
    this.modal.show();
  }
  newQuote = {
    text: '',
    author: ''
  };
  addQuote() {
    this.loggedin();
    const token = localStorage.getItem('token')

    // Logic to handle adding the new quote
    fetch('http://52.23.225.69/api/quotes', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(this.newQuote),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add the quote');
      }
      return response.json();
    })
    .then((addedQuote) => {
      // Add the new quote to the local array
      this.quotes.push(addedQuote);

      // Reset the input fields
      this.newQuote = { text: '', author: '' };

      // Close the modal
      this.modal.hide();
    })
    .catch((error) => {
      console.error('Error adding quote:', error);
    });
  }

  
}
