using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class StatusService : IStatusService
    {
        private readonly OrderManagementContext _context;
        public StatusService(OrderManagementContext context) => _context = context;

        public async Task<Stats> GetStatusAsync()
        {
            var totalCustomers = await _context.Customers.CountAsync();
            var stats = await _context.Orders.GroupBy(o => !o.IsDeleted)
                                .Select(o => new Stats { 
                                    TotalOrders = o.Count(),
                                    CompletedOrders = o.Where(co => co.Status == Core.Enums.Status.COMPLETED).Count(),
                                    DraftOrders = o.Where(co => co.Status == Core.Enums.Status.DRAFT).Count(),
                                    PendingOrders = o.Where(co => co.Status == Core.Enums.Status.PENDING).Count(),
                                    ShippedOrders= o.Where(co => co.Status == Core.Enums.Status.SHIPPED).Count(),
                                    TotalCustomers = totalCustomers
                                })
                                .FirstAsync();

           return stats;
        }
   }
}