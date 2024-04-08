namespace api.models.interfaces
{
    public interface IAuthService
    {
        bool AuthenticateUser(string username, string password);
    }

}