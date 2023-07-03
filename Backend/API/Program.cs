using API.GraphQL;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContextFactory<OrderManagementContext>(options=>
{
    options.UseInMemoryDatabase("InMemoryDb");
});

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddFiltering()
    .AddProjections();

var app = builder.Build();

app.MapGraphQL();
app.Run();
