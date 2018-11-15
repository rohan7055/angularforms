import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
      const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      //"Access-Control-Allow-Headers":'*',

      'Content-Type': 'application/x-www-form-urlencoded'

    })
  }; }



    login(username: number, password: string) {
      let body = new URLSearchParams();
body.set('ssn', username);
body.set('password', password);
        return this.http.post<any>('http://localhost:3000/RetailBanking_GroupB/user/login', { ssn: username, password: password },{headers:
        {'Content-Type': 'application/x-www-form-urlencoded'}})
            .map(user => {
                // login successful if there's a jwt token in the response
                console.log(user);
                if (user.status) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
