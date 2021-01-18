import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/_models/member';
import { IPhoto } from 'src/app/_models/photo';
import { IUser } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: IMember | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: IUser | null = null;

  constructor(
    private accountService: AccountService,
    private membersService: MembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: IPhoto = JSON.parse(response);
        this.member?.photos.push(photo);
        if (photo.isMain) {
          this.user!.mainPhotoUrl = photo.url;
          this.member!.mainPhotoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    };
  }

  setMainPhoto(newMainPhoto: IPhoto) {
    this.membersService.setMainPhoto(newMainPhoto.id).subscribe(() => {
      this.user!.mainPhotoUrl = newMainPhoto.url;

      this.accountService.setCurrentUser(this.user);

      this.member!.mainPhotoUrl = newMainPhoto.url;
      this.member!.photos.forEach((photo) => {
        if (photo.isMain) photo.isMain = false;
        if (photo.id === newMainPhoto.id) photo.isMain = true;
      });
    });
  }

  deletePhoto(photoId: number) {
    this.membersService.deletePhoto(photoId).subscribe(() => {
      this.member!.photos =
        this.member?.photos.filter((photo) => photo.id !== photoId) ?? [];
    });
  }
}
