import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: IMember[] = [];
  paginatedResult: PaginatedResult<IMember[]> = new PaginatedResult<
    IMember[]
  >();

  constructor(private http: HttpClient) {}

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page != null) {
      params = params.append('pageNumber', page!.toString());
    }

    if (itemsPerPage != null) {
      params = params.append('pageSize', itemsPerPage!.toString());
    }
    //'of' returns something as an observable
    // if (this.members.length > 0) return of(this.members);
    return this.http
      .get<IMember[]>(this.baseUrl + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          this.paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            this.paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination') ?? ''
            );
          }
          return this.paginatedResult;
        })
        // map((members) => {
        //   this.members = members;
        //   return members;
        // })
      );
  }

  getMember(username: string) {
    const member = this.members.find((member) => member.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<IMember>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: IMember) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
