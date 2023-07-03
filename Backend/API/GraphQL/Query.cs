using Core.Entities;
using Infrastructure.Data;

namespace API.GraphQL
{
    public class Query
    {
       
        [HotChocolate.Data.UseFirstOrDefault]
        [UseProjection]
        [HotChocolate.Data.UseFiltering]
        public IQueryable<Customer> GetCustomers([Service] OrderManagementContext context) {
            context.Database.EnsureCreated();
            return context.Customers;
        } 
        
        [HotChocolate.Data.UseFirstOrDefault]
        [UseProjection]
        [HotChocolate.Data.UseFiltering]
        public IQueryable<Order> GetOrders([Service] OrderManagementContext context){
            context.Database.EnsureCreated();
            return context.Orders;
        } 
    }
}