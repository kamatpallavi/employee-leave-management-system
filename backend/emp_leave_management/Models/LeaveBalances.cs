namespace emp_leave_management.Models
{
    public class LeaveBalances
    {
        public int id { get; set; }
        public int userid { get; set; }
        public int leavetypeid { get; set; }
        public int totaldays { get; set; }
        public int useddays { get; set; }
        public int remainingdays { get; set; }
        public int year { get; set; }

        public User User { get; set; }
        public LeaveTypes LeaveType { get; set; }
    }
}