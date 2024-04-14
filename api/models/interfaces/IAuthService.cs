namespace api.models.interfaces
{
    public interface IAuthService
    {
        (bool, string) AuthenticateUser(string email, string password, string role);
    }
}
