using Core.Entities;
using Core.Models;
using Core.Interfaces;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<Customer> AddOrUpdateCustomer([Service]ICustomerService customerService, CustomerModel customerModel)
             => await customerService.AddOrUpdateCustomerAsync(customerModel);

        public async Task<bool>DeleteCustomer([Service]ICustomerService customerService, int customerId)
             => await customerService.DeleteCustomerAsync(customerId);

        public async Task<Order> AddOrUpdateOrder([Service]IOrderService orderService, OrderModel orderModel)
             => await orderService.AddOrUpdateOrderAsync(orderModel);
        
         public async Task<bool>DeleteOrder([Service]IOrderService orderService, int orderId)
             => await orderService.DeleteOrderAsync(orderId);
    }
}