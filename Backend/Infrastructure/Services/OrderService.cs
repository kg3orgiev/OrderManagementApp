using Core.Entities;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly OrderManagementContext _context;
        public OrderService(OrderManagementContext context) => _context = context;

        public IQueryable<Order> GetOrders() => _context.Orders.AsNoTracking();

         public async Task<Order> AddOrUpdateOrderAsync(OrderModel orderModel)
        {
            Order order;
            if(!orderModel.Id.HasValue)
            {
                order= new Order
                {
                    OrderDate = orderModel.OrderDate,
                    CustomerId = orderModel.CustomerId,
                    DepositAmount= orderModel.DepositAmount,
                    Descriptions = orderModel.Descriptions,
                    OtherNotes = orderModel.OtherNotes,
                    Status = orderModel.Status,
                    TotalAmount = orderModel.TotalAmount,   
                    IsDelivery = orderModel.IsDelivery
                };

                await _context.Orders.AddAsync(order);
            }
            else
            {
                order = await _context.Orders.Include(x=>x.Customer).SingleAsync(x => x.Id == orderModel.Id);
                order.OrderDate = orderModel.OrderDate;
                order.CustomerId = orderModel.CustomerId;
                order.DepositAmount= orderModel.DepositAmount;
                order.Descriptions = orderModel.Descriptions;
                order.OtherNotes = orderModel.OtherNotes;
                order.Status = orderModel.Status;
                order.TotalAmount = orderModel.TotalAmount;  
                order.IsDelivery = orderModel.IsDelivery;

                _context.Orders.Update(order);
            } 
            
          await _context.SaveChangesAsync();

          return order;
        }

          public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var order = await _context.Orders.SingleAsync(x => x.Id == orderId);
            order.IsDeleted = true;

            _context.Orders.Update(order);
            
            return  await _context.SaveChangesAsync() > 0;
        }
    }
}