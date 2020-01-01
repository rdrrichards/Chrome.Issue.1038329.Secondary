import { Component, OnInit } from '@angular/core';
import { PresentationReceiverService } from '../presentation-receiver.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  url: SafeResourceUrl;
  constructor(private presentationReceiverService: PresentationReceiverService, private sanitizer: DomSanitizer) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200');
  }

  ngOnInit() {
    this.presentationReceiverService.receiverReady();
    this.presentationReceiverService.url$.subscribe(u =>
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(u)
      );
  }

}
