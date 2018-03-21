import { Component, OnInit, Inject } from '@angular/core';
import { AUTH_SERVICE, AuthService } from '../shared/auth/auth.service';
import { DATA_SERVICE, DataService } from '../shared/fhir-data/fhir-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authToken$: Observable<any>;
  public authCode$: Observable<any>;

  constructor(
    @Inject(AUTH_SERVICE) public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  public getToken() {
    this.authToken$ = this.authService.getOauthToken();
  }

  public getCode() {
    //this.authCode$ = this.authService.getOauthCode();
  }
}
