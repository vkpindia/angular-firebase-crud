import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    apiUrl = 'https://users-list-a70f5.firebaseio.com/users.json';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private _http: HttpClient) { }

    /**
    * @description: Method for getting error if occured
    * @author: Virendra Pandey
    * @since: 20/09/2018
    * @returns: Error
    */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The firebase returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `firebase returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }

    /**
    * @description: Method for extracting response data
    * @author: Virendra Pandey
    * @since: 20/09/2018
    * @returns: Body of response data or object
    */
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    /**
     * @description: Method for getting data from server
     * @author: Virendra Pandey
     * @since: 20/09/2018
     * @returns: Users data with observable
     */
    getUsers() {
        return this._http.get(this.apiUrl).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    /**
    * @description: Method for getting unique data by key
    * @author: Virendra Pandey
    * @since: 20/09/2018
    * @returns: data with observable
    */
    getUsersByKey(id): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this._http.get(url, this.httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError));
    }

    /**
    * @description: Method for posting data to server
    * @author: Virendra Pandey
    * @since: 20/09/2018
    * @returns: Observable
    */
    postUsers(users): Observable<any> {
        return this._http.post(this.apiUrl, users, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
   * @description: Method for updating server data
   * @author: Virendra Pandey
   * @since: 20/09/2018
   * @returns: Observable
   */
    updateUsers(users): Observable<any> {
        return this._http.put(this.apiUrl, users, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
    * @description: Method for deleting unique data by key
    * @author: Virendra Pandey
    * @since: 20/09/2018
    * @returns: Server url
    */
    deleteUsers(id): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this._http.delete(url, this.httpOptions).pipe(
            catchError(this.handleError));
    }
    // return this._http.delete(this.apiUrl, this.httpOptions).pipe(
    //     catchError(this.handleError));
}
