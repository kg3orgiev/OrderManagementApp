using Core.Models;

namespace Core.Interfaces
{
    public interface IStatusService
    {
         Task<Stats> GetStatusAsync();
    }
}