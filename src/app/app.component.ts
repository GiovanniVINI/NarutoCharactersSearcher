import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  characteres: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<{characters : {
        results: any[]
      }}>({
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
          }
        `,
      })
      .subscribe((result) => {

        console.log(result)
        this.characteres = result.data.characters.results;
      });
  }
}
