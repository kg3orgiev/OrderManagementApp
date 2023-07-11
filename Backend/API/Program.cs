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
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder
                          .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IStatusService, StatusService>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering();

builder.Services.AddMvc(opt=>opt.EnableEndpointRouting = false);

var app = builder.Build();
app.UseRouting();
app.UseMvc();
app.UseDefaultFiles();
app.UseStaticFiles();

InitializeDatabase(app);

app.UseCors(MyAllowSpecificOrigins);
app.MapGraphQL();
app.UseGraphQLVoyager("/graphql-voyager", new VoyagerOptions { GraphQLEndPoint = "/graphql"});

app.UseEndpoints(endpoints => endpoints.MapFallbackToController("Index", "Website"));

app.Run();


static void InitializeDatabase(IApplicationBuilder app)
{

        try
        {
            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<OrderManagementContext>();
            context.Database.Migrate();
        }
        catch(Exception ex)
        {
            var logger = app.ApplicationServices.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }
}