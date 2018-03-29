import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PloverAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = '';
    if (!req.url.startsWith('http')) {
      url = 'http://api.plover.cloud/api/' + req.url;  // 服务器
      // url = 'http://127.0.0.1:8000/api/' + req.url; // 本地
    }
    const authReq = req.clone({headers: req.headers.set('Authorization', localStorage['token'] || ''), url: url});
    return next.handle(authReq);
  }
}
