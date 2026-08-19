namespace emp_leave_management.Models
{
    public class ApplyLeaveRequest
    {
        public int LeaveTypeId { get; set; }

        public DateOnly FromDate { get; set; }

        public DateOnly ToDate { get; set; }

        public string Reason { get; set; }
    }
}