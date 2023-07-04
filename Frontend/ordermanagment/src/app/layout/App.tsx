import React from 'react';
import './styles.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CustomerDashboard from '../../features/customers/customerdashboard/Customers.Dashboard';

const client = new ApolloClient({
  cache:new InMemoryCache({
    typePolicies:{}
  }),
  uri: "http://localhost:5047/graphql/"
});

function App() {
  return (
   <ApolloProvider client={client}>
    <CustomerDashboard />
   </ApolloProvider>
  );
}

export default App;