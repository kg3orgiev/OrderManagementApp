using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly OrderManagementContext _context;
        public CustomerService(OrderManagementContext context) => _context = context;
        
        public IQueryable<Customer> GetCustomers() => _context.Customers.AsNoTracking();
    }
}