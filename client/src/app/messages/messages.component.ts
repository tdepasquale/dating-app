import { Component, OnInit } from '@angular/core';
import { IMessage } from '../_models/message';
import { IPagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];
  pagination: IPagination | undefined;
  container: 'Inbox' | 'Outbox' | 'Unread' = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageServce: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageServce
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result!;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
