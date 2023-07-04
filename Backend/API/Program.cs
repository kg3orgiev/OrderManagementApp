using API.GraphQL;
using Core.Interfaces;
using GraphQL.Server.Ui.Voyager;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContextFactory<OrderManagementContext>(options=>
{
    options.UseInMemoryDatabase("InMemoryDb");
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder
                          .WithOrigins("https://localhost", "http://localhost")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddProjections()
    .AddFiltering();

var app = builder.Build();

InitializeDatabase(app);

app.UseCors(MyAllowSpecificOrigins);
app.MapGraphQL();
app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions { GraphQLEndPoint = "/graphql"});
app.Run();


static void InitializeDatabase(IApplicationBuilder app)
{
    using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
    {
        var context = serviceScope.ServiceProvider.GetRequiredService<OrderManagementContext>();
        if (context.Database.EnsureCreated())
        {
              
            //add dummy data
        }
    }
}