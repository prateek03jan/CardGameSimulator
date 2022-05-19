using CardGame.Business.BC;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using Assert = NUnit.Framework.Assert;

namespace CardGame.UnitTest
{
	public class Tests
	{
		private CardSimulation cardSimulation;

		private List<Tuple<string[], string[]>> testCasesForLogic
			= new List<Tuple<string[], string[]>>
			()
			{
				new Tuple<string[], string[]>(
					new string[] { "2C", "4H", "10S", "4T", "5H", "7D", "RT", "PT", "4T", "3H", "5S", "KS" },
					new string[] { "4T", "4T", "PT", "RT", "7D", "5S", "10S", "KS", "2C", "3H", "4H", "5H" }
					)
			};

		[SetUp]
		public void Setup()
		{

		}

		[Test]
		public void TestExistingData()
		{
			foreach (var item in testCasesForLogic)
			{
				cardSimulation = new CardSimulation(item.Item1.ToList());
				Assert.AreEqual(cardSimulation.Simulate(), item.Item2.ToList());
			}
		}

		[Test]
		public void TestForExceptionIfNoCardComes()
		{
			Assert.Throws<ArgumentNullException>(() => new CardSimulation(null));
		}

		[Test]
		public void TestIfAnEmptyStringPresentInList()
		{
			List<string> cards = new List<string>() { "     ", "       ", "2D", "PT", "10H", "KH", "8S", "4T", "AC", "4H", "RT" };
			Assert.Throws(typeof(ArgumentNullException), () => new CardSimulation(cards));
		}

		[Test]
		public void TestForProperSort()
		{
			List<string> cards = new List<string>() { "3C", "JS", "2D", "PT", "10H", "KH", "8S", "4T", "AC", "4H", "RT" };
			cardSimulation = new CardSimulation(cards);
			var sortedOrder = cardSimulation.Simulate();

			Assert.That(sortedOrder.Count, Is.EqualTo(cards.Count));
			Assert.That(sortedOrder[0], Is.EqualTo("4T"));
			Assert.That(sortedOrder[1], Is.EqualTo("PT"));
			Assert.That(sortedOrder[2], Is.EqualTo("RT"));
			Assert.That(sortedOrder[3], Is.EqualTo("2D"));
			Assert.That(sortedOrder[4], Is.EqualTo("8S"));
			Assert.That(sortedOrder[5], Is.EqualTo("JS"));
			Assert.That(sortedOrder[6], Is.EqualTo("3C"));
			Assert.That(sortedOrder[7], Is.EqualTo("AC"));
			Assert.That(sortedOrder[8], Is.EqualTo("4H"));
			Assert.That(sortedOrder[9], Is.EqualTo("10H"));
			Assert.That(sortedOrder[10], Is.EqualTo("KH"));
		}
	}
}