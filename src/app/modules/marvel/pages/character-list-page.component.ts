import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '@core/models/character/character.interface';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { Observable } from 'rxjs';
import {
  deleteCharacter,
  loadCharacters,
  resetCharacters,
} from 'src/app/state/actions/characters.actions';
import { AppState } from 'src/app/state/app.state';
import {
  selectData,
  selectLoading,
} from 'src/app/state/selectors/characters.selectors';
import { CharacterDetailComponent } from '../components/character-detail/character-detail.component';
import { Table } from 'primeng-lts/table';

@Component({
  selector: 'app-character-list-page',
  templateUrl: './character-list-page.component.html',
  styleUrls: ['./character-list-page.component.scss'],
})
export class CharacterListPageComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  characters$: Observable<CharacterModel[]> = new Observable();
  characters: CharacterModel[] = [];

  cols = [
    { field: 'id', header: 'id' },
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
  ];

  constructor(
    private store: Store<AppState>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCharacters());
    this.loading$ = this.store.select(selectLoading);
    this.characters$ = this.store.select(selectData);
    this.getCharacters();
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCharacters());
  }

  getCharacters() {
    this.characters$.subscribe((res) => {
      this.characters = [...res];
    });
  }

  openDetailModal(mode: string, data?: CharacterModel) {
    let ref: DynamicDialogRef;
    switch (mode) {
      case 'view':
        ref = this.dialogService.open(CharacterDetailComponent, {
          header: data?.name,
          width: '60%',
          contentStyle: { 'max-height': '600px', overflow: 'auto' },
          dismissableMask: true,
          data: { character: data, mode: 'view' },
        });
        break;
      case 'edit':
        ref = this.dialogService.open(CharacterDetailComponent, {
          header: 'Edit Character',
          width: '60%',
          contentStyle: { 'max-height': '600px', overflow: 'auto' },
          dismissableMask: true,
          data: { character: data, mode: 'edit' },
        });
        break;
      case 'add':
        const character = {
          id: 0,
          name: '',
          description: '',
          thumbnail: { extension: '', path: '' },
        };

        ref = this.dialogService.open(CharacterDetailComponent, {
          header: 'New Character',
          width: '60%',
          contentStyle: { 'max-height': '600px', overflow: 'auto' },
          dismissableMask: true,
          data: { character, mode: 'add' },
        });
        break;

      default:
        break;
    }
  }

  /**
   * Delete the selected character by id
   * @param event Event
   * @param character CharacterModel
   */
  removeCharacter(event: Event, character: CharacterModel) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure you want to delete this character?',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.store.dispatch(deleteCharacter({ id: character.id }));
        this.displayMessage(
          'success',
          'The character has been removed succesfully'
        );
      },
    });
  }

  /**
   * Set search input query on table filter
   * @param event Event
   * @param characterTable Prime Table
   */
  handleFilter(event: any, characterTable: Table) {
    characterTable.filterGlobal(event.target.value, 'contains');
  }

  /**
   * Show toast message
   * @param severity "success", "info", "warn" or "error".
   * @param summary string message.
   */
  displayMessage(severity: string, summary: string): void {
    this.messageService.add({
      severity,
      summary,
    });
  }
}
