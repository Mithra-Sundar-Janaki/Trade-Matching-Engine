import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h1>Welcome to DTCC</h1>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" [(ngModel)]="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="button" (click)="handleButtonClick($event)">Login</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    @font-face {
      font-family: 'Core Sans D';
      src: url('/assets/fonts/CoreSansD-45Regular.woff2') format('woff2'),
           url('/assets/fonts/CoreSansD-45Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    .login-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url('/assets/DTCC-Brand-graphic.jpg');
      background-size: cover;
      background-position: center;
      position: fixed;
      top: 0;
      left: 0;
    }
    .login-box {
      background: #0E5447;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: white;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.9);
    }
    h1 {
      color: white;
      text-align: center;
      margin-bottom: 2rem;
      font-family: 'Core Sans D', sans-serif;
      font-size: 2rem;
      text-transform: uppercase;
    }
    button {
      width: 50%;
      padding: 0.75rem;
      background-color: #F6C544 !important;
      color: #0E5447;
      border: 2px solid #F6C544;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      transition: all 0.3s ease;
      margin: 1rem auto;
      display: block;
    }
    button:hover:not(:disabled) {
      background-color: #F6C544 !important;
      border-color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    button:active:not(:disabled) {
      background-color: #F6C544 !important;
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    button:disabled {
      background-color: #F6C544 !important;
      border-color: #F6C544;
      cursor: not-allowed;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  handleButtonClick(event: MouseEvent) {
    if (!this.username || !this.password) {
      event.preventDefault();
      alert('Please enter the credentials!');
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.username && this.password) {
      console.log('Login attempt:', { username: this.username });
      this.router.navigate(['/trades']);
    }
  }
}
