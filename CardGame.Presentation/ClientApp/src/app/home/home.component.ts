import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { Card } from '../models/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private SIMULATE_CARD_API!: string;
  private cards: Card[] = [];
  isLoaderShown: boolean = false;

  constructor(
    private dataService: DataService,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.SIMULATE_CARD_API = baseUrl + 'cardgame';
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let items: string[] = [
      '3C',
      'JS',
      '2D',
      'PT',
      '10H',
      'KH',
      '8S',
      '4T',
      'AC',
      '4H',
      'RT',
      '2T',
    ];
    this.isLoaderShown = true;
    this.dataService
      .simulateCardGame(items, this.SIMULATE_CARD_API)
      .subscribe((res) => {
        res.forEach((element: string) => {
          let c: Card = new Card(element);
          this.cards.push(c);
        });
        this.isLoaderShown = false;
      });
  }
}
