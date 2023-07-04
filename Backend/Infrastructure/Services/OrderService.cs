using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly OrderManagementContext _context;
        public OrderService(OrderManagementContext context) => _context = context;

        public IQueryable<Order> GetOrders() => _context.Orders.AsNoTracking();
    }
}