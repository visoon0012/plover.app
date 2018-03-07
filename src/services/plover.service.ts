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
    // spider
    'processing_index': 'spider/movie/processing/index/',
    'processing_detail': 'spider/movie/processing/detail/',
    // movie
    'movie_simple': 'movie_simple/',
    'movie_search': 'movie_simple/search/',
    'movie_image': 'movie_simple/image/',
    'movie_simple_spider': 'movie_simple/spider/',
    'movie': 'movie/',
    'movie_resource': 'movie_resource/',
    'movie_resource_search': 'movie_resource/search/',

    'getMovieByType': 'movie/movie/search/douban/list/',
    'getMovieDetail': 'movie/movie/search/douban/detail/',
    'searchResourcesByKeyword': 'movie/movie/search/resources/',
    // poem
    'getPoemsRandom': 'poem/random/',
    'getPoems': 'poem/',
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

