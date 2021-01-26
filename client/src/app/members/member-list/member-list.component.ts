import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/_models/member';
import { IPagination } from 'src/app/_models/pagination';
import { IUser } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: IMember[] | null | undefined;
  pagination: IPagination | undefined;
  userParams: UserParams | undefined;
  user: IUser | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
        this.userParams = new UserParams(user);
      }
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams!).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = new UserParams(this.user!);
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams!.pageNumber = event.page;
    this.loadMembers();
  }
}
