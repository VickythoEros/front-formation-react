import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from "react-dom";
import App from "./App";
import FiltersProvider from "./context";


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
