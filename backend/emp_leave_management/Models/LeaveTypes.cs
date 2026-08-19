namespace emp_leave_management.Models
{
    public class LeaveTypes
    {
        public int id { get; set; }

        public string name { get; set; }

        public int totaldays { get; set; }

        public bool isactive { get; set; }
    }
}