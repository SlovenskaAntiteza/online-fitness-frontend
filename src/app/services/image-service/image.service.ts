import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private uploadImageUrl = 'http://localhost:8080/api/images/upload-avatar';
  private uploadProgramImagesUrl =
    'http://localhost:8080/api/images/upload-program-images/';

  constructor(private http: HttpClient) {}

  public uploadAvatar(file: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(this.uploadImageUrl, formData);
  }

  public uploadProgramImages(programId: any, files: File[]) {
    let formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    let url = this.uploadProgramImagesUrl + `${programId}`;
    return this.http.post(url, formData);
  }
}
