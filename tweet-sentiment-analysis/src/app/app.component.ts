import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tweet Sentiment Analysis';
  searchPhrase = ''
  maxNumberOfTweets = 0
  tweets = []
  errorMessage = 'No Tweets Present'

  constructor(private http: HttpClient) {}

  triggerProducer() {
    this.tweets = []
    this.errorMessage = 'Loading...'
    if(this.searchPhrase != '' && !isNaN(this.maxNumberOfTweets)) {
      console.log(this.searchPhrase, this.maxNumberOfTweets)
      this.http.get('http://127.0.0.1:8000/tweet?query='+this.searchPhrase+'&limit='+this.maxNumberOfTweets.toString()).subscribe(
        (data: any) => {
          if ('error' in data) {
            this.errorMessage = data['error']
          } else {
            this.tweets = data
          }
        },
        error => {
          this.errorMessage = error
        }
      )
    } else {
      console.log('Error')
    }
  }

  clear() {
    this.tweets = []
    this.maxNumberOfTweets = 0
    this.searchPhrase = ''
    this.errorMessage = 'No Tweets Present'
  }

}
