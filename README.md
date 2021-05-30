# Project C.R.E.A.M. - SoPra Group 21

## Introduction

### Aim of the platform
Our platform allows users to simulate trading stocks, opening long and short positions, using real time financial data.
Each user can create several portfolios, each with a starting balance of 100,000 CHF, and trade stocks in the main
US markets, the Frankfurt market and the Swiss Exchange. Price, as well as the currency exchange rate, are fetched in
real time.

### Additional features

#### Real-time collaboration
You can collaborate with other users by letting them join one of your portfolios via the join code.
Each portfolio also has a dedicated trader's chat.

#### Leaderboard
The leaderboard will show the top-performing portfolios, you will be able to examine them in detail by clicking on them.

#### User profiles
By clicking on a username in the portfolio page, you will be redirected to a user's profile page, where you can see
the user's information as well as the portfolios they are trading in.

## Technologies

We are using Java for the backend and JavaScript and React for the frontend.
The main other frameworks we are using are Spring, Rest, Javamail (for password recovery),
Heroku PostGREs (persistent storage).
The financial data is provided by AlphaVantage, who kindly gave us a free license for this project.

## High level components 

There are four main components 

1. The [Dashboard](https://github.com/sopra-fs21-group-21/Client/blob/master/src/Dashboard/Dashboard.js) class, where users can inspect and use two of our main functionalities. First on the Dashboard page, users can view their own portfolios aw well as joining an existing portfolio or createing a new one. Second users can view all available public portfolios in the system sorted by balance. From both views users can click on any portfolio and be redirected to the specific portfolio page. 

1. The [Portfolio](https://github.com/sopra-fs21-group-21/Client/blob/master/src/Portfolio/Portfolio.js) class, where users can inspect the viewd portfolio. A portfolio can be accessed either by id using it URL or by clicking on some portfolio i.e from the LeaderBoard container. If users are a part of the traders in that portfolio they can also trade in it i.e by opening positions or closing positions. Otherwise users can only view main information about that portfolio. 

1. The [Profile](https://github.com/sopra-fs21-group-21/Client/blob/master/src/Profile/Profile.js) class, where key information about a specific user are displayed. If the user is inspecting his/her own profile, its possible to join or create a portfolio from the profile page, since users can view all their portfolio beside to their information, such as E-Mail, Username, creation date and online status. Additionally users can from the profile page change their E-Mail, username and password.  

1. The [Chat](https://github.com/sopra-fs21-group-21/Client/blob/master/src/Design/WrapperContent/Chat.js) class, where users can chat with each other within a portfolio, this means that traders in the same portfolio are able to chat with each other but not in others portfolio. 


## Launch and deployment

The project has continuous deployment, meaning that as soon as a commit is pushed to the main branch, the tests are
executed, and if all tests pass, the project is then deployed to Heroku (host) and to SonarCloud (for code analysis).
Therefore, just push, everything else will follow.

One caution note goes to the database structure. Because we use persistent storage, one should be careful not to break
the database logic when updating the code.

If you run the application locally the port is localhost:8080.

## Flow (illustration)

Log in into the application. You will see your portfolios and buttons to create or join new ones on the left, and the leaderboard
on the right. If you want to access your profile and update information, the top-right menu is what you are looking for.

If you click on a portfolio, you will see it's portfolio page. If you are a trader, you can open positions and chat.
if not, just enjoy the view.

## Roadmap

Some features that would make nice additions.

### Charts
Yes, we know. You say "finance" and people think charts. Our application does not have charts, but they would fit well.
You might add charts that show variations of a portfolio value, capital and cash across time.
Note that charts for a stock price history would be hard to include, as AlphaVantage does not provide historical data
for all stocks.

### Currency trading
Why not also trade currencies, both standard and crypto? We have the data, and the backend is readily extensible, as we
foresaw this possibility.

### Other markets
In a globalized world, most things finance still seem to focus on the United States (even here in Europe). Most of the data, historical and realtime,
is on US stocks. Most educational content and research is US-centered. We wanted to give our application a distinctly European touch,
which is why we are supporting two european (europe != EU) exchanges and using swiss francs as the main currency. It
would be nice to include markets from the rest of the world (though data is scarce and expensive).

## Authors

* Alessandro Vanzo - [@Alessandro](http://github.com/alessandrovanzo)
* Karim Khamaisi   - [@Karim](http://github.com/Karimkh31)
* Krzysztof Wroblewski   - [@Krzysztof](http://github.com/krwro)


## License

MIT License

Copyright (c) [2021] [Alessandro Vanzo, Krzysztof Wroblewski]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
