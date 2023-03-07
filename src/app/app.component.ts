import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  characters: {name: string, village: string, description: string, avatarSrc: string }[] = [];
  villages: any;
  searchTerm: string = '';
  filteredCharacters: any;


  pageCurrent = 1

  constructor(private readonly apollo: Apollo, private readonly matDialog: MatDialog ) {

  }


  

  onOpenDialogClick(character: any){
    this.matDialog.open(CardsComponent, { 
      data: { 
        character
      }
    }); 
  }

  onScroll(){ 
    this.apollo
      .query<{
        characters: { results: any[]},
        villages: { results: any[]} 
      }>({
        query: gql`
          query ($page: Int){
            characters(page: $page) {
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
              results{ 
              name}
            }
          }
        `,
        variables: {
          page: this.pageCurrent + 1
        }
      })
      .subscribe((result) => {
        this.characters = [...this.characters, ...result.data.characters.results];
        this.pageCurrent += 1
        this.filteredCharacters = this.characters
      });
  }
  ngOnInit() {
    this.apollo
      .query<{
        characters: { results: any[]},
        villages: { results: any[]} 
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
              results{ 
              name}
            }
          }
        `,
      })
      .subscribe((result) => {
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results;
        this.filteredCharacters = this.characters
      });

       
  }

  search(searchTerm: string) {
    if(!searchTerm) {
      this.filteredCharacters = this.characters
    }
    this.apollo
      .query<{
        characters: { results: any[]},
        villages: { results: any[]} 
      }>({
        query: gql`
          query ($searchTerm: String)  {
            characters (filter: { name: $searchTerm }) {
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
              results{ 
              name}
            }
          }
        `,
        variables: {
          searchTerm
        }
      })
      .subscribe((result) => {
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results;
        this.filteredCharacters = this.characters
      });
  } 

  chk(){
    const bodyElement = document.querySelector('body')
    bodyElement?.classList.toggle('theme-dark')
   }

}

