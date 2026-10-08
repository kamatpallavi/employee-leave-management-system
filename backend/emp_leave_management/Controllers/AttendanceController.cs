using emp_leave_management.Data;
using emp_leave_management.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace emp_leave_management.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : Controller
    {
        private readonly AppDbContext _context; // empty variable
       
        public AttendanceController(AppDbContext context) //constructore runs and fill the info in context
        {
            _context = context;
        }

        [HttpPost("punch-in")]
        public IActionResult PunchIn()
        {
            var userId = int.Parse(
                 User.FindFirst(ClaimTypes.NameIdentifier)!.Value
             );
            var today = DateTime.UtcNow.Date;
            var existingAttendance = _context.Attendance.FirstOrDefault(x => x.userid == userId && x.date == today);

            if (existingAttendance != null) { return BadRequest("no attendance"); }

            var attendance = new Attendance
            {
                userid = userId,
                date = today,
                checkin = DateTime.UtcNow,
                status = "Present"
            };
            _context.Attendance.Add(attendance);

            _context.SaveChanges();
            return Ok("attendance marked successfull");
        }
        [HttpPost("Punch-out")]
        public IActionResult PunchOut()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var today = DateTime.UtcNow.Date;
            Console.WriteLine("Today: " + today);
            Console.WriteLine("User ID: " + userId);
            var attendance = _context.Attendance
    .Where(x =>
        x.userid == userId &&
        x.checkin != null &&
        x.checkout == null
    )
    .OrderByDescending(x => x.date)
    .FirstOrDefault();
            if (attendance == null)
            {
                return BadRequest("You have not punched in today");
            }

            if (attendance.checkout != null)
            {
                return BadRequest("You have already punched out today");
            }

            attendance.checkout = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok("Punched out successfully");

        }
        [HttpGet("my-attendance")]
        public IActionResult MyAttendance()
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            var attendance = _context.Attendance
                .Where(x => x.userid == userId)
                .OrderByDescending(x => x.date)
                .ToList();

            return Ok(attendance);
        }


    }
}
