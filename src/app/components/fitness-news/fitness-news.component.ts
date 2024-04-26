import { Component } from '@angular/core';
import { RssService } from './rss.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fitness-news',
  templateUrl: './fitness-news.component.html',
  styleUrl: './fitness-news.component.css',
})
export class FitnessNewsComponent {
  public rssItems: any = [];

  constructor(private rssService: RssService, private router: Router) {
    this.rssService.getRssItmes().subscribe(
      (items) => {
        this.rssItems = items;
      },
      (error) => {
        console.error('Error when trying to get Feeds!', error);
      }
    );
  }

  redirectToLink(route: string) {
    window.open(route, 'blank');
  }
}
