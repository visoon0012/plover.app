import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PloverService {
  public plover_host = 'http://api.plover.cloud/';
  // public plover_host = 'http://localhost:8000/';
  public plover_img = 'http://api.plover.cloud/';
  public plover_api = this.plover_host + 'api/';
  public api = {
    // user
    'auth': this.plover_api + 'token/auth/',
    'refresh': this.plover_api + 'token/refresh/',
    'verify': this.plover_api + 'token/verify/',
    'user': this.plover_api + 'user/',
    // spider
    'processing_index': this.plover_api + 'spider/movie/processing/index/',
    'processing_detail': this.plover_api + 'spider/movie/processing/detail/',
    // movie
    'movie_simple': this.plover_api + 'movie_simple/',
    'movie_search': this.plover_api + 'movie_simple/search/',
    'movie_image': this.plover_api + 'movie_simple/image/',
    'movie_simple_spider': this.plover_api + 'movie_simple/spider/',
    'movie': this.plover_api + 'movie/',
    'movie_resource': this.plover_api + 'movie_resource/',
    'movie_resource_search': this.plover_api + 'movie_resource/search/',

    'getMovieByType': this.plover_api + 'movie/movie/search/douban/list/',
    'getMovieDetail': this.plover_api + 'movie/movie/search/douban/detail/',
    'searchResourcesByKeyword': this.plover_api + 'movie/movie/search/resources/',
    // poem
    'getPoemsRandom': this.plover_api + 'poem/random/',
    'getPoems': this.plover_api + 'poem/',
  };

  constructor(public http: HttpClient) {
  }

  getWithToken(url) {
    let token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders();
    headers.set('Authorization', token);
    return this.http.get(url, { headers: headers });
  }
}

