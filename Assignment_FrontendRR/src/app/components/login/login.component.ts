import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string = ''; // Property to store error messages
  successMessage: string = '';
  constructor(private cdr: ChangeDetectorRef) {} // Inject ChangeDetectorRef


  onSubmit() {
    console.log('Login data:', this.loginData);
    fetch('http://52.23.225.69/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(this.loginData),
      headers: {
        "Content-Type": "application/json",
      }    
    }).then(async (response) => {
      if (response.ok) {
        // If the login is successful (200 OK)
        const data = await response.json();
        console.log('Login successful:', data);
        // Example: Save the token or redirect the user
        localStorage.setItem('token', data.token);
        // Handle successful login
        this.successMessage = 'Login successful!';
        this.errorMessage = '';  // Clear any previous error messages
      } else {
        // If the login fails (401 Unauthorized or other errors)
        const errorData = await response.json();
        console.log('Login failed:', errorData.message);
        // Example: Display an error message
        this.successMessage = ''; 
        this.errorMessage = errorData.message ;
        this.cdr.detectChanges(); // Ensure change detection is triggered
      }
    }).catch((error) => {
      // Handle network or unexpected errors
      console.error('Error occurred:', error);
      this.successMessage = ''; 
      this.errorMessage = 'An unexpected error occurred.';
      this.cdr.detectChanges(); // Ensure change detection is triggered
    });
  }





  onSignUp() {
    console.log('Sign Up button clicked');
    fetch('http://52.23.225.69/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(this.loginData),
      headers: {
        "Content-Type": "application/json",
      }    
    }).then(async (response) => {
      if (response.ok) {
        // If the login is successful (200 OK)
        const data = await response.json();
        console.log('Sign Up Successfull:', data);
        this.successMessage = 'Sign Up Successfull!';
        this.errorMessage = ''; 
        // Example: Save the token or redirect the user
        localStorage.setItem('token', data.token);
      } else {
        // If the login fails (401 Unauthorized or other errors)
        const errorData = await response.json();
        console.log('Login failed:', errorData.message);
        // Example: Display an error message
        this.errorMessage = errorData.message;
        this.cdr.detectChanges(); // Ensure change detection is triggered
      }
    })
    .catch((error) => {
      // Handle network or unexpected errors
      console.error('Error occurred:', error);
      this.errorMessage = 'An unexpected error occurred.';
      this.cdr.detectChanges(); // Ensure change detection is triggered
    });
  }
}



