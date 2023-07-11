# OrderManagementApp
A fullstack app to maintain track of customers and orders 

Hey if you want to try this App Please download docker And follow the steps below

1. docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=sa_password!123456' -p 1601:1433 --name local-sql -d mcr.microsoft.com/mssql/server:2019-CU11-ubuntu-20.04
2. docker build -t kgeorgiev86/ordermanagementapp .
3. docker run -p 8080:80 --name local-be --link local-sql kgeorgiev86/ordermanagementapp -e "ConnectionStrings:DefaultConnection=data source=host.docker.internal,1601;initial catalog=Oma;user id=SA;Password=sa_password!123456;TrustServerCertificate=true" -d

4. http://localhost:8080/ Enjoy it, have a fun !
