using Core.Entities;
using Core.Models;

namespace Core.Interfaces
{
    public interface ICustomerService
    {
        IQueryable<Customer> GetCustomers();
        Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel); 
    }
}