using CardGame.Business.BC;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using System;

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
		[ExpectedException(typeof(ArgumentNullException))]
		public void Test1()
		{
			cardSimulation = new CardSimulation(null);
			
		}
	}
}