import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo, gql } from 'apollo-angular';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  characters: any;
  villages: any;

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
        console.log(result)
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results
      });
  }

}

