using Microsoft.EntityFrameworkCore;
using emp_leave_management.Models;

namespace emp_leave_management.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<LeaveTypes> LeaveTypes { get; set; }
        public DbSet<LeaveBalances> LeaveBalances { get; set; }
        public DbSet<LeaveRequests> LeaveRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("users");

            modelBuilder.Entity<Department>()
                .ToTable("departments");

            modelBuilder.Entity<LeaveTypes>()
                .ToTable("leavetypes");
            modelBuilder.Entity<LeaveBalances>()
                .ToTable("leavebalances");
            modelBuilder.Entity<LeaveRequests>()
                .ToTable("leaverequests");
            base.OnModelCreating(modelBuilder);
        }
    }
}