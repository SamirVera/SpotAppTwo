import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery(query: string) {
    console.log('data');

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCAAMYgcu--y91aQ3gz26IcZrtl-V7ortmHKqiw10rjv-zJVzkBZY04Gxx87nbDC7SnNRYO2Z5VpAs3aInjeshEaC01h8DRhz31l6n2aoD-xoRGH-g'
    });

    return this.http.get(url, { headers });

  }


  getNewReleases() {
    console.log('data2');
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => (data as any)['albums'].items));

  }

  getArtistas(termino: string) {
    console.log('data3');
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data => (data as any)['artists'].items));

  }

  getArtista(id: string) {
    console.log('data4');
    return this.getQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));

  }

  getTopTracks(id: string) {
    console.log('data5');
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => (data as any)['tracks']));

  }

}
