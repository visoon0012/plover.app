import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class PloverService {
  public plover_img = 'http://api.plover.cloud/';
  public api = {
    // user
    'auth': 'token/auth/',
    'refresh': 'token/refresh/',
    'verify': 'token/verify/',
    'user': 'user/',
    'user_forgot': 'user/forgot/',
    // spider
    'processing_index': 'spider/movie/processing/index/',
    'processing_detail': 'spider/movie/processing/detail/',
    // movie
    'movie_simple_mark': 'movie_simple_mark/',
    'movie_simple': 'movie_simple/',
    'movie_simple_image': 'movie_simple/image/',
    'movie_simple_spider': 'movie_simple/spider/',
    'movie': 'movie/',
    'movie_detail': 'movie/detail/',
    'movie_resource': 'movie_resource/',
    // poem
    'getPoemsRandom': 'poem/random/',
    'getPoems': 'poem/',
    // system
    'system_ss': 'system_ss/',
    'system_ss_config': 'system_ss/${id}/config/',
    'system_ss_restart': 'system_ss/${id}/restart/',
    'system_ss_user_servers': 'system_ss/user_servers',
    // novel
    'novel': 'novel/',
    'novel_search': 'novel/search/',
    'novel_chapter': 'novel_chapter/',
    'novel_chapter_search': 'novel_chapter/search/',
    'novel_chapter_read': 'novel_chapter/read/',
    'novel_chapter_cache': 'novel_chapter/${id}/cache/',
    'novel_chapter_chapters': 'novel_chapter/${id}/chapters/',
    'novel_chapter_download': 'novel_chapter/${id}/download/',
    'novel_fork': 'novel_fork/',
    'novel_fork_fork': 'novel_fork/${id}/fork/',
  };

  constructor(public http: HttpClient) {
  }

  getWithToken(url) {
    let token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders();
    headers.set('Authorization', token);
    return this.http.get(url, {headers: headers});
  }


}

