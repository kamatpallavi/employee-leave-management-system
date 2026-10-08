namespace emp_leave_management.Models
{
    public class Attendance
    {
        public int id { get; set; }

        public int userid { get; set; }

        public DateTime date { get; set; }

        public DateTime? checkin { get; set; }

        public DateTime? checkout { get; set; }

        public string? status { get; set; }

        public string? remarks { get; set; }
    }
}
