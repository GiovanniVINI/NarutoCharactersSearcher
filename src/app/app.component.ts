import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-characters',
  templateUrl: './app.component.html'
})
export class charactersComponent {
  characters: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query({
        query: gql`
          query {
            character(id: "61bd1dbc918f12c17b9c6483") {
              name
              avatarSrc
              description
              village
            }
            }
          }
        `,
      })
      .subscribe((result) => {
        this.characters = result.data as any;
      });
  }
}
