import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../service/data.service';
import { Card } from '../models/card';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allowedCardValues: string[] = [
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    'JC',
    'QC',
    'KC',
    'AC',
    '10C',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    'JD',
    'QD',
    'KD',
    'AD',
    '10D',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    'JS',
    'QS',
    'KS',
    'AS',
    '10S',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    'JH',
    'QH',
    'KH',
    'AH',
    '10H',
    '4T',
    '2T',
    'ST',
    'RT',
    'PT',
  ];
  isValidationPassed: boolean = false;
  SIMULATE_CARD_API!: string;
  cards: Card[] = [];
  isLoaderShown: boolean = false;
  userData: string =
    '2C,3C,4C,5C,6C,7C,8C,9C,JC,QC,KC,AC,10C,2D,3D,4D,5D,6D,7D,8D,9D,JD,QD,KD,AD,10D,2S,3S,4S,5S,6S,7S,8S,9S,JS,QS,KS,AS,10S,2H,3H,4H,5H,6H,7H,8H,9H,JH,QH,KH,AH,10H,4T,2T,ST,RT,PT';
  userCardData: string[] = [];
  displayCardData: Card[] = [];

  cardFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private dataService: DataService,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.SIMULATE_CARD_API = baseUrl + 'cardgame';
  }

  ngOnInit(): void {}

  simulate() {
    // let items: string[] = [
    //   '3C',
    //   'JS',
    //   '2D',
    //   'PT',
    //   '10H',
    //   'KH',
    //   '8S',
    //   '4T',
    //   'AC',
    //   '4H',
    //   'RT',
    //   '2T',
    // ];
    this.isLoaderShown = true;
    this.dataService
      .simulateCardGame(this.userCardData, this.SIMULATE_CARD_API)
      .subscribe((res) => {
        res.forEach((element: string) => {
          let c: Card = new Card(element);
          this.cards.push(c);
        });
        this.isLoaderShown = false;
      });
  }

  onModelChanged($event: any): void {
    let items: string[] = $event.split(',');
    console.log(this.validString($event));
    if (this.validString($event)) {
      this.userCardData = items;
      this.updateDisplayCardData(this.userCardData);
    }
  }

  updateDisplayCardData(items: string[]): void {
    this.displayCardData = [];
    items.forEach((element) => {
      let card: Card = new Card(element);
      this.displayCardData.push(card);
    });
  }

  validString(items: string): boolean {
    let isNotFound: boolean = false;
    let cas: string[] = items.split(',');
    cas.forEach((element) => {
      if (this.allowedCardValues.indexOf(element.trim()) < 0) {
        isNotFound = true;
        return false;
      }
      return true;
    });
    this.isValidationPassed = !isNotFound;
    return !isNotFound;
  }
}
