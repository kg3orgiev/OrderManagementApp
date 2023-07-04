using Core.Entities;
using Core.Interfaces;

namespace API.GraphQL
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        public IQueryable<Customer> GetCustomers([Service] ICustomerService customerService) => customerService.GetCustomers();
       
        [UseProjection]
        [UseFiltering]
        public IQueryable<Order> GetOrders([Service] IOrderService orderService) => orderService.GetOrders();
    }
}