using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGame.Business.BC
{
	public static class CardSimulationConstants
	{
		public static string[] generalCardIndexArray = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };
		public static string[] suitsArrayOrdered = { "T", "D", "S", "C", "H" };
		public static string[] specialCardOrdered = { "4T", "2T", "ST", "PT", "RT" };
	}
	public class CardSimulation
	{
		private CardCollection _cardCollection;

		public CardSimulation(List<string> items)
		{
			if (items == null) throw new ArgumentNullException("Card numbers are required");

			items.ForEach(item =>
			{
				if (string.IsNullOrWhiteSpace(item))
				{
					throw new ArgumentNullException("Empty string found");
				}
			});

			_cardCollection = new CardCollection(items);
		}

		public List<string> Simulate()
		{
			return _cardCollection.GetSortedCards().Select(x => x.CardValue).ToList();
		}
	}
	internal class Card
	{
		public string CardSuite { get; set; }
		public int CardIndex { get; set; }
		public bool IsSpecial { get; set; }
		public string CardValue { get; set; }

		public Card(string str)
		{
			CardValue = str;
			if (str[str.Length - 1] == 'T')
			{
				IsSpecial = true;
				CardIndex = Array.IndexOf(CardSimulationConstants.specialCardOrdered, str) + 1;
			}
			else if (str[str.Length - 1] != 'T')
			{
				CardIndex = Array.IndexOf(CardSimulationConstants.generalCardIndexArray, str.Substring(0, str.Length - 1)) + 1;
			}
			CardSuite = str[str.Length - 1].ToString();
		}
	}
	internal class CardCollection : List<Card>
	{
		public CardCollection(List<string> cardStrings)
		{
			foreach (var item in cardStrings)
			{
				Add(new Card(item));
			}
		}

		public List<Card> GetSortedCards()
		{
			return this.OrderByDescending(x => x.IsSpecial)
				.ThenBy(x => x.CardSuite, new CardSuiteComparer())
				.ThenBy(x => x.CardIndex, new SpecialCardComparer()).ToList();
		}
	}
	internal class SpecialCardComparer : IComparer<int>
	{
		public int Compare(int x, int y)
		{
			if (x < y) return -1;
			else if (x > y) return 1;
			return 0;
		}
	}
	internal class CardSuiteComparer : IComparer<string>
	{
		public int Compare(string? x, string? y)
		{
			if (Array.IndexOf(CardSimulationConstants.suitsArrayOrdered, x) < Array.IndexOf(CardSimulationConstants.suitsArrayOrdered, y))
			{
				return -1;
			}
			else if (Array.IndexOf(CardSimulationConstants.suitsArrayOrdered, x) > Array.IndexOf(CardSimulationConstants.suitsArrayOrdered, y))
			{
				return 1;
			}
			return 0;
		}
	}
}
