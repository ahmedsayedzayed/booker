import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpLink } from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { LoginModule } from './auth/login/login.module';
import { SignUpModule } from './auth/sign-up/sign-up.module';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { BookmarkModule } from './bookmarks/bookmark/bookmark.module';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LoginModule,
    SignUpModule,
    HomeModule,
    BookmarkModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        // Create an http link:
        const http = httpLink.create({
          uri: 'api/graphql',
          
        });
 
        // Create a WebSocket link:
        const ws = new WebSocketLink({
          uri: 'ws://localhost:3000/graphql',
          options: {
            reconnect: true,
          },
        });
 
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
            return kind === 'OperationDefinition' && operation === 'subscription';
          },
          ws,
          http,
        );
 
        return {
          cache: new InMemoryCache(),
          link,
          // ... options
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
