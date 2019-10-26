
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener, Renderer2, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ngOnInit() {}
}


