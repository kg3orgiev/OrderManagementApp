import './styles.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CustomerDashboard from '../../features/customers/customerdashboard/Customers.Dashboard';
import OrdersDashboard from '../../features/orders/orderdashboard/Orders.Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../../features/home/HomePage';


const client = new ApolloClient({
  cache:new InMemoryCache({
    typePolicies:{}
  }),
  uri: process.env.REACT_APP_API_SCHEMA_URL
});

function App() {
  return (
   <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="customers" element={<CustomerDashboard />} />
          <Route path="orders" element={<OrdersDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
