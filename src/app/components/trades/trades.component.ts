import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Trade {
  id: string;
  sourceName: string;
  isin: string;
  quantity: number;
  price: number;
  counterparty: string;
  tradeDate: string;
  settlementDate: string;
  executionTimestamp: string;
}

@Component({
  selector: 'app-trades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="trades-container">
      <div class="logo-container">
        <img src="assets/Logo_DTCC_1.png" alt="Logo" class="logo" />
      </div>
      <div class="top-bar">
        <div class="bar-left">
          <span class="app-name">TRADE MATCH ENGINE</span>
        </div>
        <div class="bar-actions">
          <img src="assets/icons8-account-48.png" alt="Profile" class="profile-icon" />
          <img src="assets/icons8-logout-rounded-48.png" alt="Logout" class="logout-icon" (click)="logout()" />
        </div>
      </div>
      <header>
        <h1>TRADE STATUS</h1>
      </header>
      <div class="tabs">
        <button [class.active]="activeTab === 'matched'" (click)="setActiveTab('matched')" class="matched">
          MATCHED TRADES ({{ matchedTrades.length }})
        </button>
        <button [class.active]="activeTab === 'unmatched'" (click)="setActiveTab('unmatched')" class="unmatched">
          UNMATCHED TRADES ({{ unmatchedTrades.length }})
        </button>
        <button [class.active]="activeTab === 'partiallyMatched'" (click)="setActiveTab('partiallyMatched')" class="partiallyMatched">
          PARTIALLY MATCHED TRADES ({{ partiallyMatchedTrades.length }})
        </button>
      </div>
      <section *ngIf="activeTab === 'matched'">
        <h2>MATCHED TRADES</h2>
        <table class="trades-table">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Source</th>
              <th>ISIN</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Counterparty</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Execution Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let trade of matchedTrades">
              <td>{{ trade.id }}</td>
              <td>{{ trade.sourceName }}</td>
              <td>{{ trade.isin }}</td>
              <td>{{ trade.quantity }}</td>
              <td>{{ trade.price }}</td>
              <td>{{ trade.counterparty }}</td>
              <td>{{ trade.tradeDate }}</td>
              <td>{{ trade.settlementDate }}</td>
              <td>{{ trade.executionTimestamp }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section *ngIf="activeTab === 'unmatched'">
        <h2>UNMATCHED TRADES</h2>
        <table class="trades-table">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Source</th>
              <th>ISIN</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Counterparty</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Execution Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let trade of unmatchedTrades">
              <td>{{ trade.id }}</td>
              <td>{{ trade.sourceName }}</td>
              <td>{{ trade.isin }}</td>
              <td>{{ trade.quantity }}</td>
              <td>{{ trade.price }}</td>
              <td>{{ trade.counterparty }}</td>
              <td>{{ trade.tradeDate }}</td>
              <td>{{ trade.settlementDate }}</td>
              <td>{{ trade.executionTimestamp }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section *ngIf="activeTab === 'partiallyMatched'">
        <h2>PARTIALLY MATCHED TRADES</h2>
        <table class="trades-table">
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Source</th>
              <th>ISIN</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Counterparty</th>
              <th>Trade Date</th>
              <th>Settlement Date</th>
              <th>Execution Time</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let trade of partiallyMatchedTrades">
              <td>{{ trade.id }}</td>
              <td>{{ trade.sourceName }}</td>
              <td>{{ trade.isin }}</td>
              <td>{{ trade.quantity }}</td>
              <td>{{ trade.price }}</td>
              <td>{{ trade.counterparty }}</td>
              <td>{{ trade.tradeDate }}</td>
              <td>{{ trade.settlementDate }}</td>
              <td>{{ trade.executionTimestamp }}</td>
              <td><button (click)="editTrade(trade)">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </section>
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

    .trades-container {
      width: 100vw;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-image: url('/assets/DTCC-Brand-graphic.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .logo-container {
      width: 100%;
      padding: 1rem 2rem;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .logo {
      height: 70px;
      width: auto;
      max-width: 300px;
      object-fit: contain;
      display: block;
    }
    .top-bar {
      width: 100%;
      background: #0E5447;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      box-sizing: border-box;
      height: 70px;
      position: relative;
      z-index: 1;
    }
    .bar-left {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      min-width: 0;
    }
    .app-name {
      font-family: 'Core Sans D', sans-serif;
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    }
    .bar-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .profile-icon, .logout-icon {
      height: 35px;
      width: 35px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .profile-icon:hover, .logout-icon:hover {
      transform: scale(1.1);
    }
    .trades-table button {
      background: #0E5447;
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
    .trades-table button:hover {
      background: #0d4a3f;
    }
    header {
      margin: 2rem;
      position: relative;
      z-index: 1;
    }
    h1, h2 {
      font-family: 'Core Sans D', sans-serif;
      color: #0E5447;
      text-transform: uppercase;
      margin: 0;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.8rem;
      margin: 1rem 0;
    }
    .tabs {
      display: flex;
      gap: 1rem;
      margin: 0 2rem;
      position: relative;
      z-index: 1;
    }
    .tabs button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      font-family: 'Core Sans D', sans-serif;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);
      color: #0E5447;
    }
    .tabs button.active {
      background: #0E5447;
      color: white;
    }
    .tabs button:hover:not(.active) {
      background: rgba(14, 84, 71, 0.1);
    }
    section {
      margin: 2rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      padding: 1rem;
      position: relative;
      z-index: 1;
    }
    .trades-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .trades-table th,
    .trades-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .trades-table th {
      background: #0E5447;
      color: white;
      font-family: 'Core Sans D', sans-serif;
      font-weight: bold;
    }
    .trades-table tr:hover {
      background: rgba(14, 84, 71, 0.05);
    }
  `]
})
export class TradesComponent {
  activeTab: 'matched' | 'unmatched' | 'partiallyMatched' = 'matched';

  constructor(private router: Router) {}

  matchedTrades: Trade[] = [
    {
      id: 'TRD001',
      sourceName: 'Bloomberg',
      isin: 'US0378331005',
      quantity: 1000,
      price: 150.25,
      counterparty: 'Goldman Sachs',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 10:30:00'
    },
    {
      id: 'TRD002',
      sourceName: 'Reuters',
      isin: 'US88160R1014',
      quantity: 500,
      price: 275.50,
      counterparty: 'Morgan Stanley',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 11:15:00'
    }
  ];

  unmatchedTrades: Trade[] = [
    {
      id: 'TRD003',
      sourceName: 'Bloomberg',
      isin: 'US5949181045',
      quantity: 2000,
      price: 180.75,
      counterparty: 'JP Morgan',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 14:20:00'
    }
  ];

  partiallyMatchedTrades: Trade[] = [
    {
      id: 'TRD004',
      sourceName: 'Reuters',
      isin: 'US67066G1040',
      quantity: 1500,
      price: 95.25,
      counterparty: 'Citigroup',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 15:45:00'
    }
  ];

  setActiveTab(tab: 'matched' | 'unmatched' | 'partiallyMatched') {
    this.activeTab = tab;
  }

  editTrade(trade: Trade) {
    console.log('Editing trade:', trade);
    // Implement edit functionality
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
