using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly OrderManagementContext _context;
        public CustomerService(OrderManagementContext context) => _context = context;

        public IQueryable<Customer> GetCustomers() => _context.Customers.AsNoTracking();

        public async Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel)
        {
            Customer customer;
            if(customerModel.Id == null)
            {
                customer = new Customer
                {
                    FirstName = customerModel.FirstName,
                    LastName = customerModel.LastName,
                    Email = customerModel.Email,
                    ContactNumber = customerModel.ContactNumber,
                    Address = new Address{
                        AddressLine1 = customerModel.AddressLine1,
                        AddressLine2 = customerModel.AddressLine2,
                        City = customerModel.City,
                        State = customerModel.State,
                        Country = customerModel.Country,
                    }
                };

                await _context.Customers.AddAsync(customer);
            }
            else
            {
                customer = await _context.Customers.Include(x=>x.Address).SingleAsync(x => x.Id == customerModel.Id);
                customer.FirstName = customerModel.FirstName;
                customer.LastName = customerModel.LastName;
                customer.Email = customerModel.Email;
                customer.ContactNumber = customerModel.ContactNumber;
                if(customer.Address != null)
                {
                    customer.Address.AddressLine1 = customerModel.AddressLine1;
                    customer.Address.AddressLine2 = customerModel.AddressLine2;
                    customer.Address.City = customerModel.City;
                    customer.Address.State = customerModel.State;
                    customer.Address.Country = customerModel.Country;
                }
                
                _context.Customers.Update(customer);
            }

             await _context.SaveChangesAsync();
             return customer; 
        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            var customer = await _context.Customers.SingleAsync(x => x.Id == customerId);
            customer.IsDeleted = true;

            var orders = await _context.Orders
                    .Where(x => x.CustomerId == customer.Id)
                    .ToListAsync();
            
            foreach (var order in orders)
            {
                order.IsDeleted = true;
            }

            _context.Customers.Update(customer);
            _context.Orders.UpdateRange(orders);
            
            return await _context.SaveChangesAsync() > 0;
        }
    }
}