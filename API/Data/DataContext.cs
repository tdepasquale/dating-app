using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<AppUser>()
          .HasMany(user => user.UserRoles)
          .WithOne(user => user.User)
          .HasForeignKey(user => user.UserId)
          .IsRequired();

      builder.Entity<AppRole>()
          .HasMany(user => user.UserRoles)
          .WithOne(user => user.Role)
          .HasForeignKey(user => user.RoleId)
          .IsRequired();

      builder.Entity<UserLike>().HasKey(k => new { k.SourceUserId, k.LikedUserId });

      builder.Entity<UserLike>().HasOne(s => s.SourceUser).WithMany(l => l.LikedUsers).HasForeignKey(s => s.SourceUserId).OnDelete(DeleteBehavior.Cascade);

      builder.Entity<UserLike>().HasOne(l => l.LikedUser).WithMany(l => l.LikedByUsers).HasForeignKey(l => l.LikedUserId).OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Message>().HasOne(message => message.Recipient).WithMany(message => message.MessagesReceived).OnDelete(DeleteBehavior.Restrict);

      builder.Entity<Message>().HasOne(message => message.Sender).WithMany(message => message.MessagesSent).OnDelete(DeleteBehavior.Restrict);
    }
  }
}