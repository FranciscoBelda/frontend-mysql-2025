import {Component, inject} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../common/game";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {DatePipe} from "@angular/common";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {RouterLink} from "@angular/router";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    FaIconComponent,
    DatePipe,
    RouterLink,
    NgbToast
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent {
  private readonly gameService: GameService = inject(GameService);
  favorites = false;
  games: Game[] = [];
  gameList: Game[] = [];
  toast = {
    color: 'bg-success',
    body: '',
    duration: 2000
  }
  toastShow = false;
  dataLoaded = false;

  constructor() {
    this.loadGames();
  }

  private loadGames() {
    this.gameService.getGames().subscribe(
      {
        next: value => {
          this.games = value.data;
          this.gameList = value.data;
        },
        complete: () => {
          this.dataLoaded = true;
          this.showToast('Games loaded','bg-success');

        },
        error: err => {
          this.showToast(err.message,'bg-danger');
        }
      }
    )
  }

  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }

  loadFavorites(){
    if (this.favorites){
      this.gameList = this.games.filter(
        (game) => game.favorite
      )
    }else this.gameList = this.games
  }

  changeFavorite(game: Game){
    game.favorite = !game.favorite;
    this.gameService.updateGame(game).subscribe(
      {
        next: value => {
          if (game.favorite){
            this.showToast('Añadido a favoritos','bg-success');
          }else {
            this.showToast('Eliminado de favoritos','bg-success');
          }
          this.loadGames();
        },error: err => {
          this.showToast(err.message,'bg-danger');
        }
      }
    )
  }

  favoriteList(){
    this.favorites = !this.favorites;
    this.loadFavorites();
  }

  search(event: any){
    this.gameList = this.games.filter(
      (game) => (
        game.title.toLowerCase().indexOf(event)>=0 ||
        game.subtitle.toLowerCase().indexOf(event)>=0 ||
        game.description.toLowerCase().indexOf(event)>=0
      )
    )
  }

  deleteGame(game: Game){
      this.gameService.deleteGame(game.id).subscribe(
        {
          next: value => {
            this.showToast(value.message, 'bg-success');
            this.loadGames();
          },
          error: err => {
            this.showToast(err.message,'bg-danger');
          }
        }
      )
  }

  protected readonly faHeart = faHeart;
  protected readonly faHeartBroken = faHeartBroken;
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
}
