import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { Card } from '../models/card';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  SIMULATE_CARD_API!: string;
  cards: Card[] = [];
  isLoaderShown: boolean = false;

  cardFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

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
