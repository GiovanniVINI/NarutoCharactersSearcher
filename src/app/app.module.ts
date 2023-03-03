import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatDialogModule } from  "@angular/material/dialog"
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { GraphQLModule } from './graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const uri = 'https://narutoql.up.railway.app/graphql'; // URL da API GraphQL

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    InfiniteScrollModule,
    GraphQLModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
