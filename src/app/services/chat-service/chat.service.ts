import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private sendMessageUrl = config.ROOT_PATH + 'messages/insert';
  private getMessagesUrl = config.ROOT_PATH + 'users/get-messages/';

  constructor(private http: HttpClient) {}

  public sendMessage(message: any) {
    return this.http.post(this.sendMessageUrl, message);
  }

  public getMessages(offset: number, pageSize: number, userId: any) {
    let url = this.getMessagesUrl + `${userId}/${offset}/${pageSize}`;
    return this.http.get(url);
  }
}
