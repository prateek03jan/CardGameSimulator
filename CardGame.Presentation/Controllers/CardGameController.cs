using Microsoft.AspNetCore.Mvc;
using CardGame.Business.BC;

namespace CardGame.API.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class CardGameController : ControllerBase
	{
		private readonly ILogger<CardGameController> _logger;
		private CardSimulation _cardGame;
		public CardGameController(ILogger<CardGameController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IActionResult SayHello()
		{
			return Ok("Hello");
		}

		[HttpPost]
		public IActionResult SimulatedCards([FromBody]List<string> items)
		{
			if (items == null)
			{
				return BadRequest("No cards data found");
			}
			else
			{
				_cardGame = new CardSimulation(items);
				var result = _cardGame.Simulate();
				return Ok(result);				
			}
		}
	}
}
