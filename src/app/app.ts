import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Landinglayout } from './landing/landinglayout/landinglayout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Landinglayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Habit Tracker');
}
