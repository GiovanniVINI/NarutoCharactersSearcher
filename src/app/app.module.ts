import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { charactersComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    charactersComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [charactersComponent]
})
export class AppModule { }
