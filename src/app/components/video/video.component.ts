import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent implements OnInit {
  key!: string;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key') ?? ''; 
  }

  getSafeUrl(key: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
