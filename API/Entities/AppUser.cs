namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        //DotNet Identity expects UserName to be capitalized like this.
        public string UserName { get; set; }
    }
}