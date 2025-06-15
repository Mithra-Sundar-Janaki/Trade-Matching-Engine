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
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    .tabs {
      display: flex;
      gap: 1rem;
      margin: 0 2rem 2rem 2rem;
      position: relative;
      z-index: 1;
    }
    .tabs button {
      flex: 1;
      padding: 1rem;
      font-size: 0.9rem;
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }
    .tabs button:hover {
      padding: 1.2rem;
      font-size: 1rem;
      transform: scale(1.05);
    }
    .tabs button.matched {
      background: #2ecc71;
      color: white;
      border-color: #2ecc71;
    }
    .tabs button.unmatched {
      background: #dc3545;
      color: white;
      border-color: #dc3545;
    }
    .tabs button.partiallyMatched {
      background: #FE7541;
      color: white;
      border-color: #FE7541;
    }
    .tabs button.active {
      font-weight: bold;
      padding: 1.2rem;
      font-size: 1rem;
      transform: scale(1.05);
    }
    section {
      margin: 0 2rem 2rem 2rem;
      position: relative;
      z-index: 1;
      max-height: calc(100vh - 350px);
      overflow: hidden;
      padding-bottom: 2rem;
    }
    .trades-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      position: relative;
      z-index: 1;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border: 1px solid #ddd;
    }
    .trades-table thead {
      position: sticky;
      top: 0;
      z-index: 2;
      background: #0E5447;
    }
    .trades-table tbody {
      display: block;
      height: calc(100vh - 450px);
      overflow-y: auto;
      margin-bottom: 1rem;
    }
    .trades-table thead tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    .trades-table tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    .trades-table th,
    .trades-table td {
      padding: 1rem;
      text-align: left;
      border: 1px solid #ddd;
    }
    .trades-table th {
      background: #0E5447;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
      padding: 0.75rem 1rem;
      position: sticky;
      top: 0;
      border: 1px solid #0E5447;
    }
    .trades-table td {
      background: white;
      border: 1px solid #ddd;
    }
    .trades-table tr:hover td {
      background: #f9f9f9;
    }
  `]
})
export class TradesComponent {
  activeTab: 'matched' | 'unmatched' | 'partiallyMatched' = 'matched';

  constructor(private router: Router) {}

  matchedTrades: Trade[] = [
    {
      id: 'TRD001',
      sourceName: 'Source A',
      isin: 'US0378331005',
      quantity: 1000,
      price: 150.25,
      counterparty: 'Counterparty X',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 10:30:00'
    },
    {
      id: 'TRD002',
      sourceName: 'Source B',
      isin: 'US5949181045',
      quantity: 500,
      price: 275.50,
      counterparty: 'Counterparty Y',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 11:15:00'
    },
    {
      id: 'TRD003',
      sourceName: 'Source C',
      isin: 'US88160R1014',
      quantity: 750,
      price: 180.75,
      counterparty: 'Counterparty Z',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 13:45:00'
    },
    {
      id: 'TRD004',
      sourceName: 'Source A',
      isin: 'US0378331005',
      quantity: 2000,
      price: 151.00,
      counterparty: 'Counterparty X',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 14:20:00'
    },
    {
      id: 'TRD005',
      sourceName: 'Source B',
      isin: 'US5949181045',
      quantity: 1200,
      price: 276.25,
      counterparty: 'Counterparty Y',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 15:00:00'
    },
    {
      id: 'TRD016',
      sourceName: 'Source C',
      isin: 'US88160R1014',
      quantity: 1800,
      price: 181.50,
      counterparty: 'Counterparty Z',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 15:30:00'
    },
    {
      id: 'TRD017',
      sourceName: 'Source A',
      isin: 'US0378331005',
      quantity: 3000,
      price: 152.00,
      counterparty: 'Counterparty X',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 16:00:00'
    }
  ];

  unmatchedTrades: Trade[] = [
    {
      id: 'TRD006',
      sourceName: 'Source D',
      isin: 'US0378331005',
      quantity: 800,
      price: 149.50,
      counterparty: 'Counterparty W',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 09:45:00'
    },
    {
      id: 'TRD007',
      sourceName: 'Source E',
      isin: 'US5949181045',
      quantity: 1500,
      price: 274.75,
      counterparty: 'Counterparty V',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 10:15:00'
    },
    {
      id: 'TRD008',
      sourceName: 'Source F',
      isin: 'US88160R1014',
      quantity: 300,
      price: 181.25,
      counterparty: 'Counterparty U',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 11:30:00'
    },
    {
      id: 'TRD009',
      sourceName: 'Source D',
      isin: 'US0378331005',
      quantity: 2500,
      price: 150.75,
      counterparty: 'Counterparty W',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 13:00:00'
    },
    {
      id: 'TRD010',
      sourceName: 'Source E',
      isin: 'US5949181045',
      quantity: 900,
      price: 275.00,
      counterparty: 'Counterparty V',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 14:45:00'
    }
  ];

  partiallyMatchedTrades: Trade[] = [
    {
      id: 'TRD011',
      sourceName: 'Source G',
      isin: 'US0378331005',
      quantity: 1200,
      price: 150.50,
      counterparty: 'Counterparty T',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 09:30:00'
    },
    {
      id: 'TRD012',
      sourceName: 'Source H',
      isin: 'US5949181045',
      quantity: 1800,
      price: 275.25,
      counterparty: 'Counterparty S',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 10:45:00'
    },
    {
      id: 'TRD013',
      sourceName: 'Source I',
      isin: 'US88160R1014',
      quantity: 600,
      price: 180.50,
      counterparty: 'Counterparty R',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 12:15:00'
    },
    {
      id: 'TRD014',
      sourceName: 'Source G',
      isin: 'US0378331005',
      quantity: 3000,
      price: 151.25,
      counterparty: 'Counterparty T',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 13:30:00'
    },
    {
      id: 'TRD015',
      sourceName: 'Source H',
      isin: 'US5949181045',
      quantity: 1500,
      price: 276.00,
      counterparty: 'Counterparty S',
      tradeDate: '2024-03-15',
      settlementDate: '2024-03-17',
      executionTimestamp: '2024-03-15 15:15:00'
    }
  ];

  setActiveTab(tab: 'matched' | 'unmatched' | 'partiallyMatched') {
    this.activeTab = tab;
  }

  editTrade(trade: Trade) {
    console.log('Edit trade:', trade);
    // Implement edit logic here
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
