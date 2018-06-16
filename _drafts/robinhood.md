---
layout: post
title: Trading stocking on Robinhood
date:   2018-09-17 13:00:00 -0500
categories: [finance]
comments: true
tags: [investment]
---

I started trading stocks on May 7, 2018 using an app called [Robinhood](https://robinhood.com/).
After 3 months, my profit is 27%.
In this post, I will summarize what I have learned so far.

<style> /* set the CSS */

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}
</style>
<div id='trend'> </div>

<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src='/js/trend.js'> </script>

> Return rate from stock trading.


## basics

For an absolute beginner, the market opens at 9:30am and closes at 4pm Eastern time.
Trading outside this window (called pre- and post-market) is also possible by upgrading one's trading account.

To earn money from stock trading, one needs to buy stocks at low price and sell them at high price.
If buying proceeds selling, it's called [buy long](https://en.wikipedia.org/wiki/Long_(finance)).
Interestingly, selling could proceed buying as well.
And it's called [sell short](https://en.wikipedia.org/wiki/Short_(finance)).
In this case, one borrows stocks from the trading company to sell,
and buys from the market at a later time to return to the trading company.

terminologies

bid - ask gap

The stock price is constantly changing, thus the time delay between your wish to
buy and transaction complete could translate to a price difference.
This time delay gives rise to different types of buying and selling choices

* buy / sell types
    * market order
    * limit order
    * stop loss
    * stop limit order

* [day trading](https://en.wikipedia.org/wiki/Day_trading): buy and sell the same stock on the same day.
  There are regulations on day trading. For beginners, it means if one executes 4 or more day trades in
  5 business days, there is good chance that one will be identified as [pattern day trader](https://en.wikipedia.org/wiki/Pattern_day_trader) and be required to have
  25k in the trading account. More details can be seen in this [stackexchange answer](https://money.stackexchange.com/questions/9658/ways-to-avoid-being-labeled-a-pattern-day-trader).


## Robinhood

Compared to traditional stock trading platforms, Robinhood has several unique features:

* no processing fee (My Roth IRA charges $4.95 per transaction)
* no minimum account balance
* no fee for trading options either

Robinhood does not support sell short.

* The dotted horizontal line is the closing price in the previous day


## strategy

### done correctly so far
* most stocks I bought are big companies, which I am willing to keep for long

### mistakes

All my mistakes boils down to greed and it manifests in different ways

* tendency to keep the losers

* trade too often
  The idea of this is like compound interest


## tax

Until you sell the stock, the gain is not materialized yet and there is no taxable income.

1 year

long-term
short-term

Long-term gains are taxed at rates of 0%, 15%, or 20%, depending on one's tax bracket.
And short-term gains are taxed as ordinary income.

If you find the information useful and willing to start stock trading with Robinhood,
you can do me a favor to sign up with [this referral link](https://share.robinhood.com/dongz15).
Both of us can get a free stock.
I signed up with my friend's referral link and got a share of ZNGA at the price of $3.77.

## todo

* automation
* more analysis
    * correlation between stocks

## reference

* [Khana academy stocks and bonds](https://www.khanacademy.org/economics-finance-domain/core-finance/stock-and-bonds)
* [](https://medium.com/@the_hip_hapa/what-i-learned-from-18-months-trading-stocks-on-robinhood-5956436ffe93)
