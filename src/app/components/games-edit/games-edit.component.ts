import {Component, inject, Input, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {faHeartBroken} from "@fortawesome/free-solid-svg-icons/faHeartBroken";
import {DatePipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormValidators} from "../../validators/FormValidators";

@Component({
  selector: 'app-games-edit',
  standalone: true,
  imports: [
    NgbToast,
    DatePipe,
    FaIconComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './games-edit.component.html',
  styleUrl: './games-edit.component.css'
})
export class GamesEditComponent implements OnInit{
  @Input('id')id!:number;
  private readonly gameService: GameService = inject(GameService);
  private readonly router: Router = inject(Router);
  edit = false;
  toast = {
    color: 'bg-success',
    body: '',
    duration: 2000
  }
  toastShow = false;
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  formGame: FormGroup = this.formBuilder.group({
    id: [0],
    title: ['',
      [ Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        FormValidators.notOnlyWhiteSpace,
        FormValidators.forbiddenName(/sexo|droga/i)
      ]],
    subtitle: ['',
      [ Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255)
      ]],
    description: ['',
      [ Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255)
      ]],
    image: ['',
      [ Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]],
    favorite: [false],
    created_at: ['']
  });

  ngOnInit(): void {
    this.loadData();
  }

  // GETTERS
  get title():any{
    return this.formGame.get('title');
  }
  get subtitle():any{
    return this.formGame.get('subtitle');
  }
  get description():any{
    return this.formGame.get('description');
  }
  get image():any{
    return this.formGame.get('image');
  }
  get favorite():any{
    return this.formGame.get('favorite');
  }
  get created_at():any{
    return this.formGame.get('created_at');
  }

  private loadData() {
    if (this.id){
      this.edit = true;
      this.gameService.getOneGame(this.id).subscribe(
        {
          next: value => {
            console.log(value);
            this.formGame.setValue(value.data);
          },
          complete: () => {
            this.showToast('Juego cargado','bg-success');
          },
          error: err => {
            this.showToast(err.message,'bg-danger');
          }
        }
      )
    }
  }

  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }

  onSubmit(){
    if (this.formGame.invalid){
      this.formGame.markAllAsTouched();
      return;
    }
    if (this.edit){
      this.gameService.updateGame(this.formGame.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast(value.message,'bg-success');
            this.router.navigateByUrl('/games/list');
          },
          error: err => {
            this.showToast(err.message,'bg-danger');
          }
        }
      )
    }else {
      const game = this.formGame.getRawValue();
      delete game.created_at;
      this.gameService.addGame(game).subscribe(
        {
          next: value => {
            this.showToast(value.message,'bg-success');
            this.router.navigateByUrl('/games/list');
          },
          error: err => {
            this.showToast(err.message,'bg-danger');
          }
        }
      )
    }
  }

  protected readonly faHeart = faHeart;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faHeartBroken = faHeartBroken;
}
