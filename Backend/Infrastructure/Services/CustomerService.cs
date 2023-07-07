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
                customer = await _context.Customers.Include(i=>i.Address).SingleAsync(x => x.Id == customerModel.Id);
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
    }
}