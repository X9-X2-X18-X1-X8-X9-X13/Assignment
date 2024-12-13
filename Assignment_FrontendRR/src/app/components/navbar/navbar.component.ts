import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  toggleTheme(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked; // Determine if the checkbox is checked
    const htmlElement = document.documentElement;
    const newTheme = isChecked ? 'dark' : 'light'; // Set theme based on checkbox state
    console.log('New Theme: ', newTheme);
    htmlElement.setAttribute('data-bs-theme', newTheme);
  }

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById('toggle-theme');
    if (toggleButton) {
      toggleButton.addEventListener('click', this.toggleTheme);
    }
  }
}
