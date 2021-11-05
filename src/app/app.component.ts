import { Component } from '@angular/core';
// import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // subj = new Subject<string>();
  // behavior = new BehaviorSubject<string>('BehaviorSubject = 1');
  // reply = new ReplaySubject<string>(2);
  // async = new AsyncSubject<string>();

  ngOnInit() {
    // this.subj.next('Subject = 1');
    // this.subj.subscribe( value => console.log(value) );
    // this.subj.next('Subject = 2');
    // this.subj.next('Subject = 3');

    // this.behavior.next('BehaviorSubject = 2');
    // this.behavior.next('BehaviorSubject = 3');
    // this.behavior.next('BehaviorSubject = 4');
    // this.behavior.subscribe( value => console.log(value) );

    // this.reply.next('ReplaySubject = 1');
    // this.reply.next('ReplaySubject = 2');
    // this.reply.subscribe( value => console.log(value) );
    // this.reply.next('ReplaySubject = 3');
    
    // this.async.subscribe( value => console.log(value) );
    // this.async.next('AsyncSubject = 1');
    // this.async.next('AsyncSubject = 2');
    // this.async.next('AsyncSubject = 3');
    // this.async.complete();
  }
}
