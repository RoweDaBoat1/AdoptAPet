namespace api.models.interfaces
{
    public interface IAuthService
    {
        bool AuthenticateUser(string email, string password, string userType);
    }

}