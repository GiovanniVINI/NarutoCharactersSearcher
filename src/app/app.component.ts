import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
import { CardsComponent } from './components/cards/cards.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  characters: {
    name: string;
    village: string;
    description: string;
    avatarSrc: string;
  }[] = [];
  villages: any;
  searchTerm: string = '';
  filteredCharacters: any;
  form: FormGroup
  filteredPerVillages: any;
  
  @Output() filterPerVillagesChanges = new EventEmitter()

  pageCurrent = 1;

  constructor(
    private readonly apollo: Apollo,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: FormBuilder
  ) {
   this.form= this.formBuilder.group({
      villages: this.formBuilder.group({
        cloud: this.formBuilder.control(false),
        grass: this.formBuilder.control(false),
        springs: this.formBuilder.control(false),
        leaf: this.formBuilder.control(false),
        mist: this.formBuilder.control(false),
        flower: this.formBuilder.control(false),
        rain: this.formBuilder.control(false),
        sand: this.formBuilder.control(false),
        sound: this.formBuilder.control(false),
        star: this.formBuilder.control(false),
        rock: this.formBuilder.control(false),
        waterfall: this.formBuilder.control(false),
        tides: this.formBuilder.control(false),
      })
    })
  }

  onOpenDialogClick(character: any) {
    this.matDialog.open(CardsComponent, {
      data: {
        character,
      },
    });
  }

  onScroll() {
    this.apollo
      .query<{
        characters: { results: any[] };
        villages: { results: any[] };
      }>({
        query: gql`
          query ($page: Int, $villages: [String!]!) {
            characters(page: $page, filter: { village: $villages}) {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                name
                avatarSrc
                description
                rank
                village
                age
                firstAnimeAppearance
                firstMangaAppearance
                notableFeatures
                nameMeaning
              }
            }
            villages {
              results {
                name
              }
            }
          }
        `,
        variables: {
          page: this.pageCurrent + 1,
          villages: Object.keys(this.form.get('villages')?.value).filter(key => this.form.get('villages')?.value[key])
        },
      })
      .subscribe((result) => {
        this.characters = [
          ...this.characters,
          ...result.data.characters.results,
        ];
        this.pageCurrent += 1;
        this.filteredCharacters = this.characters;
      });
  }
  ngOnInit() {
    this.form.get('villages')?.valueChanges.subscribe((value) => { 
      const filterVillageSelected = Object.keys(value).filter(village => value[village])
      this.searchVilage(filterVillageSelected)
    } )
    this.apollo
      .query<{
        characters: { results: any[] };
        villages: { results: any[] };
      }>({
        query: gql`
          query {
            characters {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                rank
                name
                age
                avatarSrc
                description
                rank
                village
                firstAnimeAppearance
                firstMangaAppearance
                notableFeatures
                nameMeaning
              }
            }
            villages {
              results {
                name
              }
            }
          }
        `,
      })
      .subscribe((result) => {
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results;
        this.filteredCharacters = this.characters;
      });
  }

  search(searchTerm: string) {
    if (!searchTerm) {
      this.filteredCharacters = this.characters;
    }
    this.apollo
      .query<{
        characters: { results: any[] };
        villages: { results: any[] };
      }>({
        query: gql`
          query ($searchTerm: String) {
            characters(filter: { name: $searchTerm }) {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                rank
                name
                age
                avatarSrc
                description
                rank
                village
                firstAnimeAppearance
                firstMangaAppearance
                notableFeatures
                nameMeaning
              }
            }
            villages {
              results {
                name
              }
            }
          }
        `,
        variables: {
          searchTerm,
        },
      })
      .subscribe((result) => {
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results;
        this.filteredCharacters = this.characters;
      });
  }

  searchVilage(searchVillageTerm: string[]) {
    if (!searchVillageTerm) {
      this.filteredPerVillages = this.characters;
    }
    this.apollo
      .query<{
        characters: { results: any[] };
      }>({
        query: gql`
          query ($searchVillageTerm: [String!]!) {
            characters(filter: { village: $searchVillageTerm }) {
              info {
                count
                pages
                next
                prev
              }
              results {
                _id
                rank
                name
                age
                avatarSrc
                description
                rank
                village
                firstAnimeAppearance
                firstMangaAppearance
                notableFeatures
                nameMeaning
              }
            }
          }
        `,
        variables: {
          searchVillageTerm,
        },
      })
       .subscribe((result) => {
        this.characters = result.data.characters.results;
        this.filteredCharacters = this.characters;
      }); 
  }

  chk() {
    const bodyElement = document.querySelector('body');
    if (bodyElement?.classList.toggle('theme-dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      
    }
  }
}