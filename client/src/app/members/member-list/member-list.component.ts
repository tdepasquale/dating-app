import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/member';
import { IPagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: IMember[] | null | undefined;
  pagination: IPagination | undefined;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService
      .getMembers(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }
}
