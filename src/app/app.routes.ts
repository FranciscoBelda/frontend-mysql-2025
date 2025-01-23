import { Routes } from '@angular/router';
import {GamesListComponent} from "./components/games-list/games-list.component";
import {GamesEditComponent} from "./components/games-edit/games-edit.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games/list',
    pathMatch: "full"
  },
  {
    path: 'games/list',
    component: GamesListComponent
  },
  {
    path: 'games/add',
    component: GamesEditComponent
  },
  {
    path: 'games/edit/:id',
    component: GamesEditComponent
  },
  {
    path: '**',
    redirectTo: 'games/list',
    pathMatch: "full"
  },
];
