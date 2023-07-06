using Microsoft.EntityFrameworkCore;
using Core.Entities;

namespace Infrastructure.Data
{
    public class OrderManagementContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public OrderManagementContext(DbContextOptions options) 
         : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
            .HasQueryFilter(c=> !c.IsDeleted)
            .HasData(new Customer{
                Id = 1,
                FirstName = "James",
                LastName = "Bond",
                ContactNumber = "111",
                IsDeleted = false,
                Email = "james.bond@email.com"
            },
            new Customer{
                Id = 2,
                FirstName = "James2",
                LastName = "Bond2",
                ContactNumber = "222",
                IsDeleted = false,
                Email = "james.bond2@email.com"
            });

            modelBuilder.Entity<Address>().HasData(
            new Address{
                Id = 1,
                CustomerId = 1,
                AddressLine1 = "AddressLine1",
                AddressLine2 = "AddressLine2",
                City = "Sofia",
                Country = "BG",
                State = "Sf"
            },
            new Address{
                Id = 2,
                CustomerId = 2,
                AddressLine1 = "AddressLine1",
                AddressLine2 = "AddressLine2",
                City = "London",
                Country = "EN",
                State = "LN"
            });

            modelBuilder.Entity<Order>()
            .HasQueryFilter(o=> !o.IsDeleted)
            .HasData(new Order {
                Id = 1,
                CustomerId = 1,
                OrderDate =  DateTime.Now,
                Descriptions = "Descriptions 1",
                TotalAmount = 300,
                DepositAmount = 200,
                IsDelivery = true,
                IsDeleted = false,
                Status = Core.Enums.Status.Pending,
                OtherNotes = "Some Other Notes"
            },
              new Order{
                Id = 2,
                CustomerId = 2,
                OrderDate =  DateTime.Now,
                Descriptions = "Descriptions",
                TotalAmount = 500,
                DepositAmount = 100,
                IsDelivery = true,
                IsDeleted = false,
                Status = Core.Enums.Status.Pending,
                OtherNotes = "Some Other Notes"
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}