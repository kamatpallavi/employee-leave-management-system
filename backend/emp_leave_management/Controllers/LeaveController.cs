using emp_leave_management.Data;
using emp_leave_management.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace emp_leave_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("balance/{id}")]
        public IActionResult LeaveBalance(int id)
        {
            var balances = _context.LeaveBalances.Where(x => x.userid == id).ToList();
            if(balances.Count == 0)
            {
                return NotFound("No leave balance found for this user");
            }
            return Ok(balances);
        }

        [Authorize]
        [HttpPost("apply")]
        public IActionResult ApplyLeave(ApplyLeaveRequest request)
        {
            // Get logged-in user's ID from JWT
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
            );

            // Create LeaveRequests object
            var leave = new LeaveRequests
            {
                userid = userId,
                leavetypeid = request.LeaveTypeId,
                fromdate = request.FromDate,
                todate = request.ToDate,
                reason = request.Reason,
                status = "Pending"
            };

            // Add to LeaveRequests table
            _context.LeaveRequests.Add(leave);

            // Save to database
            _context.SaveChanges();

            return Ok("Leave applied successfully");
        }

        // manager to see the pending leave requests
        [Authorize(Roles = "Manager")]
        [HttpGet("pending")]
        public IActionResult PendReq()
        {
            var req = _context.LeaveRequests
                .Where(x => x.status == "Pending")
                .ToList();

            if (req.Count == 0)
            {
                return NotFound("No pending leave requests");
            }

            return Ok(req);
        }



        [Authorize(Roles = "Manager")]
        [HttpPut("approve/{id}")]
        public IActionResult ApproveLeave(int id)
        {
            // 1. Find the leave request
            var leaveRequest = _context.LeaveRequests
                .FirstOrDefault(x => x.id == id);

            if (leaveRequest == null)
            {
                return NotFound("Leave request not found");
            }

            // 2. Calculate number of days
            var days = leaveRequest.todate.DayNumber
                       - leaveRequest.fromdate.DayNumber + 1;

            // 3. Find the employee's balance for this leave type
            var balance = _context.LeaveBalances
                .FirstOrDefault(x =>
                    x.userid == leaveRequest.userid &&
                    x.leavetypeid == leaveRequest.leavetypeid);

            if (balance == null)
            {
                return NotFound("Leave balance not found");
            }

            // 4. Update balance
            balance.remainingdays = balance.remainingdays - days;
            balance.useddays = balance.useddays + days;

            // 5. Approve the request
            leaveRequest.status = "Approved";

            _context.SaveChanges();

            return Ok("Leave approved and balance updated");
        }






        [Authorize(Roles = "Manager")]
        [HttpPut("reject/{id}")]
        public IActionResult RejectLeave(int id)
        {
            var userId = int.Parse(
                User.FindFirst(ClaimTypes.NameIdentifier)!.Value
                );
            var leaveRequest = _context.LeaveRequests.FirstOrDefault(x => x.id == id);
            if (leaveRequest == null)
            {
                return NotFound("Leave request not found");
            }

            leaveRequest.status = "Rejected";
            leaveRequest.approvedby = userId;
            leaveRequest.actiondate = DateTime.UtcNow;
            _context.SaveChanges();

            return Ok("Leave request rejected");
        }


        [Authorize]
        [HttpGet("my-leaves")]
        public IActionResult MyLeaves()
        {
            // get logged-in user's ID from JWT
            var userId = int.Parse(
               User.FindFirst(ClaimTypes.NameIdentifier)!.Value
               );

            // find LeaveRequests belonging to that user
            var leavereq = _context.LeaveRequests.Where(x => x.userid == userId).ToList();

            // if nothing found, return NotFound
            if (leavereq == null)
            {
                return NotFound("Leave request not found");
            }
            // otherwise return the requests
            else {                 return Ok(leavereq);
            }
        }
    }
}
