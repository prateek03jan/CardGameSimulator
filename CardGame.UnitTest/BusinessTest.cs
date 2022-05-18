using CardGame.Business.BC;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace CardGame.UnitTest
{
	public class Tests
	{
		private CardSimulation cardSimulation;

		[SetUp]
		public void Setup()
		{
		}

		[Test]
		public void TestForProperSort()
		{
			List<string> cards = new List<string>() { "3C", "JS", "2D", "PT", "10H", "KH", "8S", "4T", "AC", "4H", "RT"};
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