namespace emp_leave_management.Models
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string passwordhash { get; set; }
        public string role { get; set; }
        public int departmentid { get; set; }
        public DateTime createddate { get; set; }
        public bool isactive { get; set; }
    }
}