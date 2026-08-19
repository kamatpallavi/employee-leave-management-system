namespace emp_leave_management.Models
{
    public class LeaveRequests
    {
        public int id { get; set; }

        public int userid { get; set; }

        public int leavetypeid { get; set; }

        // PostgreSQL DATE → C# DateOnly
        public DateOnly fromdate { get; set; }

        public DateOnly todate { get; set; }

        public string? reason { get; set; }

        public string status { get; set; }

        // PostgreSQL TIMESTAMP → C# DateTime
        public DateTime applieddate { get; set; }

        public int? approvedby { get; set; }

        public DateTime? actiondate { get; set; }

        // Navigation properties
        public User User { get; set; }

        public LeaveTypes LeaveType { get; set; }
    }
}