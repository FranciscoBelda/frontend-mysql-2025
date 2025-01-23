import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseGame, ApiResponseGames, ApiResponseMessage, Game} from "../common/game";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }
  getGames():Observable<ApiResponseGames>{
    return this.http.get<ApiResponseGames>(
      environment.urlBase
    )
  }

  getOneGame(id: number): Observable<ApiResponseGame>{
    return this.http.get<ApiResponseGame>(
      environment.urlBase+'/'+id
    )
  }

  addGame(game: Game): Observable<ApiResponseMessage>{
    return this.http.post<ApiResponseMessage>(
      environment.urlBase,game
    )
  }

  updateGame(game: Game): Observable<ApiResponseMessage>{
    return this.http.put<ApiResponseMessage>(
      environment.urlBase+'/'+game.id,game
    )
  }

  deleteGame(id: number): Observable<ApiResponseMessage>{
    return this.http.delete<ApiResponseMessage>(
      environment.urlBase+'/'+id
    )
  }

}
