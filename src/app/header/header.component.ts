import { Component, OnInit, Inject } from '@angular/core';
import { AUTH_SERVICE, AuthService } from '../shared/auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authContext$: Observable<any>;

  constructor(
    @Inject(AUTH_SERVICE) public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  public headerAuth(){
    this.authContext$ = this.authService.getOauthToken();
  }

}
