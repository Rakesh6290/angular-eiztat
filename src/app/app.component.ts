import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Train Seat Reservation System';
  seats: any[] = [];
  requestedSeats: number = 0;

  constructor() {
    this.initializeSeats();
  }
  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < 12; i++) {
      let row = [];
      let rowLength = i === 11 ? 3 : 7;
      for (let j = 0; j < rowLength; j++) {
        row.push({ seatNumber: seatNumber++, booked: false });
      }
      this.seats.push(row);
    }
  }

  onSubmit() {
    let seatsToBook = this.requestedSeats;
    if (seatsToBook > 7 || seatsToBook < 1) return;

    for (let row of this.seats) {
      let availableSeats = row.filter((seat) => !seat.booked).length;
      if (availableSeats >= seatsToBook) {
        this.bookSeatsInRow(row, seatsToBook);
        return;
      }
    }

    this.bookNearbySeats(seatsToBook);
  }

  bookSeatsInRow(row, seatsToBook) {
    let bookedSeats = 0;
    for (let seat of row) {
      if (!seat.booked && bookedSeats < seatsToBook) {
        seat.booked = true;
        bookedSeats++;
      }
    }
    console.log('Seats booked successfully in the same row');
  }

  bookNearbySeats(seatsToBook) {
    let bookedSeats = 0;
    for (let row of this.seats) {
      for (let seat of row) {
        if (!seat.booked && bookedSeats < seatsToBook) {
          seat.booked = true;
          bookedSeats++;
        }
        if (bookedSeats === seatsToBook) {
          console.log('Nearby seats booked successfully');
          return;
        }
      }
    }
  }
}
