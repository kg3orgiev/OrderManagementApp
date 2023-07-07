using Core.Entities;
using Core.Models;
using Core.Interfaces;

namespace API.GraphQL
{
    public class Mutation
    {
        public async Task<Customer> AddOrUpdateCustomer([Service]ICustomerService customerService, CustomerModel customerModel)
             => await customerService.AddOrUpdateCustomerAsync(customerModel);

        public async Task<Order> AddOrUpdateOrder([Service]IOrderService orderService, OrderModel orderModel)
             => await orderService.AddOrUpdateOrderAsync(orderModel);
    }
}