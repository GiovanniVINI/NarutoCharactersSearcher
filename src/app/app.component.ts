import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  characters: any;
  villages: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<{
        characters: { results: any[]},
        villages: { results: any[]}
      }>({
        query: gql`
          query {
            characters(filter: {village: "leaf"}) {
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
      })
      .subscribe((result) => {
        console.log(result)
        this.characters = result.data.characters.results;
        this.villages = result.data.villages.results
      });
  }

}
