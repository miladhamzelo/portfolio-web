'use strict';
import {Component, View, OnInit}  from 'angular2/core';
import {Http, HTTP_PROVIDERS}     from 'angular2/http';
import {FooterService}            from '../../shared/services/footer.service';
import {Link}                     from '../../shared/models/footer/definitions/link';
import {LastModified}             from '../../shared/models/footer/definitions/last.modified';

@Component({
  selector: 'footer',
  providers: [Http, HTTP_PROVIDERS, FooterService]
})
@View({
  templateUrl: './footer/components/footer.html',
  styleUrls: ['./footer/components/footer.css']
})
export class FooterComponent implements OnInit {
  public links:Array<Link>;
  public currentDate:Date;
  public lastModified:LastModified;
  private _footerService:FooterService;

  constructor(footerService:FooterService) {
    this._footerService = footerService;
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.getLinks();
    this.getLastModified();
  }

  getLinks() {
    this._footerService.getLinks().then(
      links => this.links = links
    );
  }

  getLastModified() {
    this._footerService.getLastModified().subscribe(
      lastModified => this.lastModified = lastModified
    );
  }
}