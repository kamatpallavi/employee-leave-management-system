using Microsoft.AspNetCore.Mvc;
using emp_leave_management.Data;
using emp_leave_management.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


namespace emp_leave_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IConfiguration _configuration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            // 1. Check whether the email already exists
            var exit = _context.Users
                .FirstOrDefault(x => x.email == user.email);

            if (exit != null)
            {
                return BadRequest("Email already exists");
            }

            // 2. Hash the password
            user.passwordhash =
                BCrypt.Net.BCrypt.HashPassword(user.passwordhash);

            // 3. Set registration date
            user.createddate = DateTime.UtcNow;

            // 4. Set user as active
            user.isactive = true;

            // 5. Save the user
            _context.Users.Add(user);
            _context.SaveChanges();

            // 6. Get all active leave types
            var leaveTypes = _context.LeaveTypes
                .Where(x => x.isactive)
                .ToList();

            // 7. Create initial leave balance for each leave type
            foreach (var leaveType in leaveTypes)
            {
                var balance = new LeaveBalances
                {
                    userid = user.id,
                    leavetypeid = leaveType.id,
                    totaldays = leaveType.totaldays,
                    useddays = 0,
                    remainingdays = leaveType.totaldays,
                    year = DateTime.UtcNow.Year
                };

                _context.LeaveBalances.Add(balance);
            }

            // 8. Save the leave balances
            _context.SaveChanges();

            return Ok("User registered successfully");
        }


        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginRequest user)
        {
            // 1. Find the user using email
            var existingUser = _context.Users
                .FirstOrDefault(x => x.email == user.email);

            // 2. Check whether user exists
            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password");
            }

            // 3. Compare entered password with stored hashed password
            bool passwordMatch =
                BCrypt.Net.BCrypt.Verify(
                    user.password,
                    existingUser.passwordhash
                );

            // 4. If password is wrong
            if (!passwordMatch)
            {
                return Unauthorized("Invalid email or password");
            }

            // 5. Create claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, existingUser.id.ToString()),
                new Claim(ClaimTypes.Email, existingUser.email),
                new Claim(ClaimTypes.Role, existingUser.role)
            };

            // 6. Get the secret key from appsettings.json
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                )
            );

            // 7. Create signing credentials
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            // 8. Create JWT
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            // 9. Convert token into a string
            var tokenString = new JwtSecurityTokenHandler()
                .WriteToken(token);

            // 10. Return token
            return Ok(new
            {
                message = "User logged in successfully",
                token = tokenString
            });
        }
    }
}