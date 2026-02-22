import { useState } from "react";
import { BookOpen, TrendingUp, Landmark, Globe, Shield, BarChart3, AlertTriangle, Brain, ChevronRight, ArrowLeft, Search } from "lucide-react";

const categories = [
  {
    id: "forex",
    title: "Forex Trading",
    icon: Globe,
    description: "Master the world's largest financial market",
    articles: [
      {
        id: "fx-1",
        title: "What is Forex Trading?",
        readTime: "8 min",
        content: `Foreign exchange (forex) trading is the buying and selling of currencies on the global decentralized market. With a daily volume exceeding $7.5 trillion, it is the largest and most liquid financial market in the world.\n\n**How It Works**\nCurrencies are traded in pairs — for example, EUR/USD represents the euro against the US dollar. When you buy EUR/USD, you're buying euros and selling dollars simultaneously.\n\n**Major Pairs**\n- EUR/USD (Euro / US Dollar) — most traded pair globally\n- GBP/USD (British Pound / US Dollar) — "Cable"\n- USD/JPY (US Dollar / Japanese Yen)\n- USD/CHF (US Dollar / Swiss Franc)\n\n**Market Sessions**\nThe forex market operates 24/5 across three major sessions:\n- **Sydney/Tokyo (Asian):** Lower volatility, range-bound\n- **London (European):** Highest volume, major moves\n- **New York (American):** Overlaps with London for peak liquidity\n\n**Key Concepts**\n- **Pip:** The smallest price increment (0.0001 for most pairs)\n- **Lot Size:** Standard (100K), Mini (10K), Micro (1K)\n- **Leverage:** Allows controlling large positions with small capital\n- **Spread:** Difference between bid and ask price — your cost of entry\n\n**Why Institutions Trade Forex**\nCentral banks, hedge funds, and multinational corporations use forex for hedging, speculation, and international commerce. Retail traders account for roughly 5% of daily volume.`,
      },
      {
        id: "fx-2",
        title: "Technical Analysis Fundamentals",
        readTime: "12 min",
        content: `Technical analysis is the study of historical price action to forecast future movements. Unlike fundamental analysis, it focuses purely on charts and patterns.\n\n**Core Principles**\n1. Price discounts everything — all known information is reflected in price\n2. Price moves in trends — uptrend, downtrend, or range\n3. History tends to repeat — patterns recur due to market psychology\n\n**Essential Chart Patterns**\n- **Head & Shoulders:** Reversal pattern signaling trend exhaustion\n- **Double Top/Bottom:** Two failed attempts to break a level\n- **Triangles:** Ascending, descending, and symmetrical consolidation\n- **Flags & Pennants:** Continuation patterns within strong trends\n\n**Key Indicators**\n- **Moving Averages (SMA/EMA):** Trend direction and dynamic support/resistance\n- **RSI (Relative Strength Index):** Overbought (>70) / oversold (<30) conditions\n- **MACD:** Momentum and trend-following indicator\n- **Bollinger Bands:** Volatility measurement and mean reversion\n\n**Support & Resistance**\nPrice levels where buying or selling pressure historically concentrates. These are the foundation of most trading strategies.\n\n**Candlestick Patterns**\n- Doji: Indecision\n- Engulfing: Strong reversal signal\n- Hammer/Shooting Star: Rejection of price level\n- Morning/Evening Star: Three-candle reversal`,
      },
      {
        id: "fx-3",
        title: "Risk Management for Forex Traders",
        readTime: "10 min",
        content: `Risk management is the single most important skill for long-term survival in forex trading. Most retail traders fail not because of bad entries, but because of poor risk control.\n\n**The 1-2% Rule**\nNever risk more than 1-2% of your account on a single trade. On a $25,000 account, that means a maximum loss of $250-$500 per trade.\n\n**Position Sizing**\nCalculate your lot size based on:\n- Account balance\n- Risk percentage\n- Stop loss distance in pips\n\nFormula: Lot Size = (Account × Risk%) / (Stop Loss Pips × Pip Value)\n\n**Stop Loss Strategies**\n- **Fixed pips:** Simple but not adaptive\n- **ATR-based:** Adjusts to current volatility\n- **Structure-based:** Below support / above resistance\n- **Never move stops further from entry**\n\n**Risk-to-Reward Ratio (R:R)**\nA minimum of 1:2 R:R means your wins are twice your losses. Even with a 40% win rate, you're profitable at 1:3 R:R.\n\n**Correlation Risk**\nTrading EUR/USD and GBP/USD simultaneously doubles your USD exposure. Be aware of correlated positions.\n\n**Drawdown Management**\n- Max daily loss: 2-3% of account\n- Max total drawdown: 5-10%\n- If you hit daily max, stop trading — no exceptions`,
      },
      {
        id: "fx-4",
        title: "Fundamental Analysis in Forex",
        readTime: "11 min",
        content: `Fundamental analysis evaluates currencies based on economic data, central bank policy, and geopolitical events.\n\n**Key Economic Indicators**\n- **NFP (Non-Farm Payrolls):** US employment data, released first Friday monthly. Massive volatility.\n- **CPI (Consumer Price Index):** Inflation gauge — drives central bank decisions\n- **GDP (Gross Domestic Product):** Overall economic health\n- **Interest Rate Decisions:** The single biggest driver of currency value\n- **PMI (Purchasing Managers Index):** Leading economic indicator\n\n**Central Banks to Watch**\n- **Federal Reserve (Fed):** USD — world's reserve currency\n- **European Central Bank (ECB):** EUR\n- **Bank of England (BoE):** GBP\n- **Bank of Japan (BoJ):** JPY — known for intervention\n- **Reserve Bank of Australia (RBA):** AUD\n\n**Interest Rate Differentials**\nMoney flows toward higher-yielding currencies. If the Fed raises rates while the ECB holds, EUR/USD tends to fall.\n\n**Geopolitical Events**\n- Elections, wars, trade agreements, sanctions\n- Safe-haven flows: USD, JPY, CHF, Gold\n- Risk-on flows: AUD, NZD, emerging market currencies\n\n**How to Use the Economic Calendar**\nAlways check the calendar before trading. High-impact events can move markets 50-100+ pips in seconds.`,
      },
    ],
  },
  {
    id: "crypto",
    title: "Cryptocurrency",
    icon: TrendingUp,
    description: "Digital assets, blockchain, and DeFi",
    articles: [
      {
        id: "cr-1",
        title: "Understanding Cryptocurrency Markets",
        readTime: "10 min",
        content: `Cryptocurrency represents a paradigm shift in finance — decentralized, borderless, and operating 24/7/365.\n\n**Bitcoin (BTC)**\nCreated in 2009 by Satoshi Nakamoto. Fixed supply of 21 million coins. Acts as "digital gold" and the benchmark for the entire crypto market. Market cap frequently exceeds $1 trillion.\n\n**Ethereum (ETH)**\nLaunched in 2015 by Vitalik Buterin. Programmable blockchain enabling smart contracts, DeFi, and NFTs. Transitioned to Proof of Stake in 2022.\n\n**Market Structure**\n- **Centralized Exchanges (CEX):** Binance, Coinbase, Kraken — traditional order book trading\n- **Decentralized Exchanges (DEX):** Uniswap, dYdX — peer-to-peer, no intermediary\n- **OTC Desks:** Large institutional trades executed off-exchange\n\n**Key Differences from Traditional Markets**\n- 24/7 trading — no market close\n- Higher volatility — 5-10% daily moves are common\n- Largely unregulated — less institutional protection\n- On-chain transparency — all transactions are public\n\n**Crypto Trading Strategies**\n- HODLing: Long-term holding through cycles\n- Swing Trading: Capturing multi-day moves\n- Scalping: High-frequency short-term trades\n- DeFi Yield: Earning returns through liquidity provision`,
      },
      {
        id: "cr-2",
        title: "Blockchain Technology Explained",
        readTime: "9 min",
        content: `A blockchain is a distributed, immutable ledger that records transactions across a network of computers.\n\n**How Blocks Work**\nEach block contains:\n- Transaction data\n- A timestamp\n- A cryptographic hash of the previous block\n- A nonce (for Proof of Work chains)\n\nThis creates an unbreakable chain — altering one block invalidates all subsequent blocks.\n\n**Consensus Mechanisms**\n- **Proof of Work (PoW):** Miners solve complex puzzles. Used by Bitcoin. Energy-intensive but battle-tested.\n- **Proof of Stake (PoS):** Validators stake tokens. Used by Ethereum. More energy-efficient.\n- **Delegated PoS:** Elected validators. Used by Solana, Cardano.\n\n**Smart Contracts**\nSelf-executing code deployed on blockchain. "If X happens, then Y executes." No intermediary needed. Powers DeFi, NFTs, DAOs.\n\n**Layer 2 Solutions**\nBuilt on top of Layer 1 blockchains to improve speed and reduce costs:\n- Lightning Network (Bitcoin)\n- Arbitrum, Optimism (Ethereum)\n- Polygon (Ethereum sidechain)\n\n**Real-World Applications**\n- Cross-border payments\n- Supply chain tracking\n- Digital identity\n- Tokenized real-world assets (RWA)`,
      },
    ],
  },
  {
    id: "indices",
    title: "Indices & Equities",
    icon: BarChart3,
    description: "Stock markets, indices, and equity trading",
    articles: [
      {
        id: "idx-1",
        title: "Trading Major Global Indices",
        readTime: "10 min",
        content: `Stock indices measure the performance of a basket of stocks, providing a snapshot of market health.\n\n**Major US Indices**\n- **S&P 500 (SPX):** 500 largest US companies. The benchmark for global equities.\n- **NASDAQ 100 (NAS100):** Tech-heavy index. Apple, Microsoft, NVIDIA, Amazon, Meta.\n- **Dow Jones (US30):** 30 blue-chip industrial companies. Price-weighted.\n\n**Global Indices**\n- **FTSE 100:** Top 100 UK companies on London Stock Exchange\n- **DAX 40:** 40 largest German companies on Frankfurt Exchange\n- **Nikkei 225:** Japan's premier index\n- **Hang Seng:** Hong Kong / China exposure\n\n**Why Trade Indices?**\n- Diversified exposure — one trade covers an entire sector\n- High liquidity — tight spreads, easy execution\n- Clear trends — indices tend to trend more consistently than individual stocks\n- Macro-driven — react to economic data, earnings seasons, Fed decisions\n\n**Index Trading Strategies**\n- **Trend following:** Indices trend well on daily/weekly timeframes\n- **Mean reversion:** Buy dips in bull markets at key moving averages\n- **Breakout trading:** React to range breaks on earnings or data releases\n- **Sector rotation:** Shift between tech-heavy NAS100 and broad SPX based on macro conditions\n\n**Key Drivers**\n- Federal Reserve policy\n- Corporate earnings reports\n- Employment and inflation data\n- Geopolitical events`,
      },
      {
        id: "idx-2",
        title: "Understanding Market Cycles",
        readTime: "8 min",
        content: `Markets move in cycles driven by economic conditions, investor psychology, and monetary policy.\n\n**The Four Phases**\n1. **Accumulation:** Smart money buys after a downturn. Low volume, skepticism high. Media is bearish.\n2. **Markup (Bull Market):** Prices rise, public participation increases. Momentum strategies thrive.\n3. **Distribution:** Smart money sells to late entrants. High volume, euphoria. "Everyone is a genius."\n4. **Markdown (Bear Market):** Prices fall, panic selling. Opportunity for prepared traders.\n\n**Economic Cycle Alignment**\n- **Expansion:** Rising GDP, low unemployment, rising stock prices\n- **Peak:** Maximum economic output, inflation concerns, Fed tightening\n- **Contraction:** Falling GDP, rising unemployment, declining stocks\n- **Trough:** Maximum pessimism, best buying opportunities\n\n**Sector Rotation**\n- Early cycle: Financials, consumer discretionary\n- Mid cycle: Technology, industrials\n- Late cycle: Energy, materials, healthcare\n- Recession: Utilities, consumer staples, bonds\n\n**Key Lesson**\nThe best traders don't predict cycles — they identify which phase we're in and position accordingly.`,
      },
    ],
  },
  {
    id: "bonds",
    title: "Bonds & Fixed Income",
    icon: Shield,
    description: "Government bonds, yields, and fixed income markets",
    articles: [
      {
        id: "bd-1",
        title: "Bond Markets Explained",
        readTime: "9 min",
        content: `The bond market is significantly larger than the stock market, with over $130 trillion in outstanding debt globally.\n\n**What is a Bond?**\nA bond is a loan from an investor to a borrower (government or corporation). The borrower pays periodic interest (coupon) and returns the principal at maturity.\n\n**Types of Bonds**\n- **US Treasuries:** Backed by the US government. Considered "risk-free."\n  - T-Bills: <1 year maturity\n  - T-Notes: 2-10 year maturity\n  - T-Bonds: 20-30 year maturity\n- **Corporate Bonds:** Issued by companies. Higher yield = higher risk.\n  - Investment Grade (IG): BBB and above\n  - High Yield (Junk): Below BBB\n- **Municipal Bonds:** State/local government. Often tax-exempt.\n- **Sovereign Bonds:** Foreign government debt (UK Gilts, German Bunds, Japan JGBs)\n\n**The Yield Curve**\nPlots bond yields across maturities. Shape tells us about economic expectations:\n- **Normal (upward):** Economy healthy, growth expected\n- **Inverted:** Short-term yields > long-term. Historically predicts recession.\n- **Flat:** Uncertainty, transition period\n\n**Bond Prices vs. Yields**\nThey move inversely. When yields rise, bond prices fall (and vice versa). This is crucial for understanding central bank policy impact.\n\n**Why Traders Watch Bonds**\nThe 10-year Treasury yield is the benchmark for mortgage rates, corporate borrowing, and equity valuations. Rising yields pressure growth stocks.`,
      },
    ],
  },
  {
    id: "institutional",
    title: "Institutional Trading",
    icon: Landmark,
    description: "How banks, hedge funds, and institutions trade",
    articles: [
      {
        id: "inst-1",
        title: "How Investment Banks Trade",
        readTime: "12 min",
        content: `Investment banks are the backbone of global financial markets, facilitating trillions in daily transactions.\n\n**Top Trading Banks (by revenue)**\n- JPMorgan Chase — consistently #1 in FICC and equities\n- Goldman Sachs — legendary trading culture, strong in equities\n- Morgan Stanley — wealth management powerhouse with strong trading\n- Citigroup — global reach, dominant in FX\n- Bank of America — significant fixed income presence\n- Barclays, Deutsche Bank, UBS — major European players\n\n**How Bank Trading Desks Work**\n- **Market Making:** Banks provide liquidity by quoting bid/ask prices. They profit from the spread.\n- **Flow Trading:** Executing client orders. Banks see massive order flow, giving them market insight.\n- **Proprietary Trading:** Trading the bank's own capital (restricted post-Volcker Rule)\n- **Sales & Trading:** Sales team interfaces with clients; traders execute and manage risk\n\n**FICC (Fixed Income, Currencies & Commodities)**\n- Rates trading (government bonds, swaps)\n- Credit trading (corporate bonds, CDS)\n- FX trading (spot, forwards, options)\n- Commodities (oil, metals, agriculture)\n\n**Equities Division**\n- Cash equities (stock trading)\n- Equity derivatives (options, structured products)\n- Prime brokerage (services for hedge funds)\n- Electronic trading (algorithmic execution)\n\n**A Day on the Trading Floor**\n- 6:00 AM: Morning meeting — overnight developments, economic calendar\n- 7:00 AM: Pre-market preparation, position review\n- 9:30 AM: Market open — highest activity period\n- Throughout day: Manage positions, execute client orders, manage risk\n- 4:00 PM: Market close — P&L review, position adjustments\n\n**Compensation**\nBase salary + bonus. Junior traders: $150-300K total. Senior traders/MDs: $1-10M+. Top performers at top banks can earn significantly more.`,
      },
      {
        id: "inst-2",
        title: "Hedge Fund Strategies Explained",
        readTime: "14 min",
        content: `Hedge funds are private investment vehicles that employ sophisticated strategies to generate returns regardless of market direction.\n\n**Top Hedge Funds by AUM**\n- Bridgewater Associates ($150B+) — Ray Dalio's macro fund\n- Citadel ($60B+) — Ken Griffin's multi-strategy powerhouse\n- Millennium Management ($60B+) — Israel Englander's pod-based model\n- D.E. Shaw ($50B+) — Quantitative and systematic strategies\n- Two Sigma ($40B+) — AI and machine learning driven\n- Renaissance Technologies — Jim Simons' legendary Medallion Fund (best track record in history)\n\n**Major Strategy Categories**\n\n**1. Long/Short Equity**\nBuy undervalued stocks, short overvalued ones. Market-neutral or directionally biased. Most common hedge fund strategy.\n\n**2. Global Macro**\nTrade across all asset classes based on macroeconomic views. George Soros famously shorted the British Pound in 1992, making $1B in a day.\n\n**3. Quantitative/Systematic**\nAlgorithmic trading based on mathematical models. Renaissance Technologies' Medallion Fund returned ~66% annually before fees for 30 years.\n\n**4. Event-Driven**\n- Merger arbitrage: Profit from M&A spreads\n- Distressed debt: Buy bonds of struggling companies at deep discounts\n- Special situations: Spin-offs, restructurings\n\n**5. Fixed Income Arbitrage**\nExploit small pricing inefficiencies in bonds. Requires massive leverage. LTCM's strategy before its collapse.\n\n**6. Multi-Strategy**\nDeploy capital across multiple strategies. Citadel and Millennium use "pod" models where independent teams run sub-strategies.\n\n**The Pod Model**\nModern multi-strat funds allocate capital to independent teams (pods). Each pod runs its own strategy with strict risk limits. If a pod loses beyond its threshold, it gets cut. Highly competitive — only the best survive.\n\n**Fee Structure**\nTraditional: 2% management fee + 20% performance fee ("2 and 20"). Top funds charge more — Citadel charges pass-through fees, Renaissance charged 5/44.`,
      },
      {
        id: "inst-3",
        title: "Order Flow & Market Microstructure",
        readTime: "11 min",
        content: `Understanding how orders actually move through financial markets separates retail traders from institutional thinkers.\n\n**The Order Book**\nA real-time list of buy and sell orders at each price level. Shows:\n- Bid side: Buyers willing to purchase\n- Ask side: Sellers willing to sell\n- Depth: Volume at each price level\n\n**Order Types**\n- **Market Order:** Execute immediately at best available price\n- **Limit Order:** Execute only at specified price or better\n- **Stop Order:** Triggered when price reaches a level\n- **Iceberg Order:** Only shows a fraction of total size (institutional tool)\n- **TWAP/VWAP:** Time/volume weighted average price algorithms\n\n**How Institutions Execute**\nLarge orders can't be placed at once — they'd move the market. Instead:\n- **Algorithmic execution:** Break orders into small pieces over time\n- **Dark pools:** Private venues where large orders are matched anonymously\n- **Block trades:** Negotiated off-exchange between institutions\n\n**Market Makers**\nEntities that continuously quote bid and ask prices, providing liquidity. They profit from the spread and manage inventory risk. Citadel Securities handles ~25% of all US equity volume.\n\n**Smart Money Concepts**\n- **Liquidity pools:** Areas where stop losses cluster (above highs, below lows)\n- **Order blocks:** Zones where institutional orders were placed\n- **Fair value gaps:** Imbalances where price moved too fast, likely to be revisited\n- **Displacement:** Aggressive price moves indicating institutional activity`,
      },
    ],
  },
  {
    id: "failures",
    title: "Historic Failures & Crises",
    icon: AlertTriangle,
    description: "Lessons from the biggest financial collapses",
    articles: [
      {
        id: "fail-1",
        title: "Lehman Brothers: The Collapse That Changed Everything",
        readTime: "15 min",
        content: `On September 15, 2008, Lehman Brothers filed for bankruptcy — the largest in US history at $639 billion in assets. It triggered a global financial crisis that nearly destroyed the modern financial system.\n\n**Background**\nFounded in 1847, Lehman Brothers was the fourth-largest US investment bank. By 2007, it was heavily invested in mortgage-backed securities (MBS) and collateralized debt obligations (CDOs).\n\n**What Went Wrong**\n\n**1. Subprime Mortgage Exposure**\nLehman aggressively bought subprime mortgages and packaged them into securities. When housing prices stopped rising, these assets became toxic.\n\n**2. Excessive Leverage**\nLehman operated at 30:1 leverage — meaning a 3.3% decline in asset values would wipe out all equity. For context, most banks today operate at 10-12:1.\n\n**3. Repo 105 Accounting**\nLehman used a trick called "Repo 105" to temporarily move $50B in assets off its balance sheet before quarterly reports, making its leverage appear lower. This was later deemed misleading.\n\n**4. Failed Rescue Attempts**\n- Bank of America chose to buy Merrill Lynch instead\n- Barclays' bid was blocked by UK regulators\n- The US government, unlike with Bear Stearns, decided not to bail out Lehman\n\n**The Aftermath**\n- Global stock markets crashed — Dow fell 500 points the next day\n- Credit markets froze — banks stopped lending to each other\n- AIG required a $182B government bailout\n- Unemployment in the US peaked at 10%\n- Global GDP contracted for the first time since WWII\n- Led to Dodd-Frank Act, Volcker Rule, and Basel III regulations\n\n**Key Lessons**\n1. Leverage kills — even profitable positions can wipe you out at high leverage\n2. Concentration risk — never put all capital in one trade or asset class\n3. Counterparty risk — your broker/bank can fail\n4. Liquidity vanishes exactly when you need it most\n5. "Too big to fail" is a myth — until it isn't`,
      },
      {
        id: "fail-2",
        title: "Long-Term Capital Management (LTCM)",
        readTime: "12 min",
        content: `LTCM was a hedge fund founded in 1994 by John Meriwether (former Salomon Brothers star) with Nobel laureates Myron Scholes and Robert Merton on the team. It nearly collapsed the global financial system in 1998.\n\n**The Strategy**\nLTCM used convergence trades — betting that price relationships between similar bonds would return to historical norms. Small inefficiencies × enormous leverage = large returns.\n\n**The Numbers**\n- Starting capital: $1.25 billion\n- Peak assets: $140 billion\n- Leverage: 25:1 on-balance sheet, effectively 100:1+ with derivatives\n- Returns: 21% (1995), 43% (1996), 41% (1997)\n\n**What Went Wrong**\nIn August 1998, Russia defaulted on its debt. Global panic ensued:\n- Investors fled to safety (US Treasuries)\n- Spreads that LTCM bet would converge instead widened dramatically\n- LTCM lost $4.6 billion in less than four months\n- Their positions were so large that unwinding them would crash markets\n\n**The Bailout**\nThe Federal Reserve organized a consortium of 14 banks to inject $3.6 billion. Not a government bailout — but coordinated by the Fed to prevent systemic collapse.\n\n**Why It Matters**\n- Proved that mathematical models can't account for all scenarios\n- Demonstrated systemic risk from a single highly-leveraged entity\n- Models assumed normal distributions — reality has "fat tails"\n- Correlation goes to 1 in a crisis — diversification fails when you need it most\n\n**Famous Quote**\nJohn Meriwether: "If I had been leveraged less, I would have made a fortune." The strategy was sound — the leverage was lethal.`,
      },
      {
        id: "fail-3",
        title: "Bear Stearns, Barings Bank & Other Notable Collapses",
        readTime: "13 min",
        content: `**Bear Stearns (2008)**\nFifth-largest US investment bank. Collapsed in March 2008 — six months before Lehman.\n- Heavily exposed to subprime MBS\n- Two internal hedge funds collapsed in June 2007 (early warning ignored)\n- Clients and counterparties pulled funding in a bank run\n- Stock went from $170 to $2 in days\n- JPMorgan bought it for $10/share with Fed backing\n- Lesson: Confidence is everything in banking. Once it's gone, it's over.\n\n**Barings Bank (1995)**\nBritain's oldest merchant bank (founded 1762). Destroyed by one trader.\n- Nick Leeson, a 28-year-old trader in Singapore, made unauthorized trades in Nikkei futures\n- He hid $1.4 billion in losses in a secret account (Error Account 88888)\n- When the Kobe earthquake hit Japan, his positions were devastated\n- Total losses: $1.3 billion — more than the bank's entire capital\n- Barings was sold to ING for £1\n- Lesson: Risk controls and oversight are non-negotiable. One rogue trader can destroy centuries of legacy.\n\n**Archegos Capital (2021)**\nBill Hwang's family office collapsed spectacularly:\n- Used total return swaps to build $30B+ in concentrated stock positions\n- Positions were hidden from banks because swaps don't require disclosure\n- When Viacom (now Paramount) stock dropped, margin calls triggered forced selling\n- Goldman and Morgan Stanley sold early and survived\n- Credit Suisse lost $5.5 billion; Nomura lost $3 billion\n- Lesson: Concentrated positions + leverage + hidden risk = disaster\n\n**Credit Suisse (2023)**\nSwiss banking giant, founded 1856, absorbed by UBS:\n- Years of scandals: Archegos losses, Greensill collapse, spying scandal\n- Customer deposits fled — $120B withdrawn in Q4 2022\n- Swiss government orchestrated emergency takeover by UBS for $3.2B\n- $17B in AT1 bonds written to zero (controversial)\n- Lesson: Repeated risk management failures erode trust until the institution becomes unviable\n\n**MF Global (2011)**\nRun by former Goldman CEO and NJ Governor Jon Corzine:\n- Bet big on European sovereign debt\n- Used customer funds to cover margin calls (illegal)\n- $1.6 billion in customer money went missing\n- Lesson: Customer funds are sacred. Violating segregation rules is the ultimate breach of trust.`,
      },
    ],
  },
  {
    id: "quizzes",
    title: "Quizzes & Tests",
    icon: Brain,
    description: "Test your knowledge across all topics",
    articles: [],
    quizzes: [
      {
        id: "q-1",
        title: "Forex Fundamentals Quiz",
        questions: [
          { q: "What is a pip in forex trading?", options: ["1% of account", "Smallest price increment (0.0001)", "A trading strategy", "A type of order"], answer: 1 },
          { q: "Which session has the highest forex volume?", options: ["Tokyo", "Sydney", "London", "New York"], answer: 2 },
          { q: "What does an inverted yield curve historically predict?", options: ["Bull market", "Recession", "Inflation", "Currency devaluation"], answer: 1 },
          { q: "What leverage ratio did Lehman Brothers operate at before collapse?", options: ["5:1", "10:1", "20:1", "30:1"], answer: 3 },
          { q: "What is the daily volume of the forex market?", options: ["$500 billion", "$2 trillion", "$7.5 trillion", "$15 trillion"], answer: 2 },
        ],
      },
      {
        id: "q-2",
        title: "Institutional Trading Quiz",
        questions: [
          { q: "What percentage of US equity volume does Citadel Securities handle?", options: ["5%", "10%", "25%", "50%"], answer: 2 },
          { q: "What is the 'pod model' in hedge funds?", options: ["A type of algorithm", "Independent teams with separate risk limits", "A regulatory framework", "A bond trading strategy"], answer: 1 },
          { q: "Which hedge fund has the best long-term track record?", options: ["Bridgewater", "Citadel", "Renaissance Medallion Fund", "Two Sigma"], answer: 2 },
          { q: "What was the Repo 105 trick used by Lehman Brothers?", options: ["A trading strategy", "Temporarily hiding assets off balance sheet", "A type of bond", "An accounting standard"], answer: 1 },
          { q: "Who destroyed Barings Bank?", options: ["John Meriwether", "Nick Leeson", "Bill Hwang", "Jon Corzine"], answer: 1 },
        ],
      },
      {
        id: "q-3",
        title: "Risk Management Quiz",
        questions: [
          { q: "What is the recommended maximum risk per trade?", options: ["5-10%", "3-5%", "1-2%", "0.1%"], answer: 2 },
          { q: "What does R:R stand for?", options: ["Rate of Return", "Risk to Reward", "Relative Ratio", "Revenue Regression"], answer: 1 },
          { q: "What happens to correlation in a market crisis?", options: ["Goes to zero", "Stays the same", "Goes to 1", "Becomes negative"], answer: 2 },
          { q: "What killed LTCM's strategy?", options: ["Bad trades", "Excessive leverage on convergence trades", "Fraud", "Regulatory changes"], answer: 1 },
          { q: "What is a dark pool?", options: ["An illegal exchange", "A private venue for large anonymous orders", "A type of cryptocurrency", "A derivatives market"], answer: 1 },
        ],
      },
    ],
  },
];

type ViewState =
  | { type: "library" }
  | { type: "category"; categoryId: string }
  | { type: "article"; categoryId: string; articleId: string }
  | { type: "quiz"; categoryId: string; quizId: string };

export default function Learning() {
  const [view, setView] = useState<ViewState>({ type: "library" });
  const [search, setSearch] = useState("");
  const [quizState, setQuizState] = useState<{ answers: Record<number, number>; submitted: boolean }>({ answers: {}, submitted: false });

  const resetQuiz = () => setQuizState({ answers: {}, submitted: false });

  // Library view
  if (view.type === "library") {
    const filtered = categories.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.articles.some((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
      <div className="space-y-6 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your complete guide to the financial markets — forex, crypto, indices, bonds, institutional trading, and the lessons from history's greatest collapses.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search topics, articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-md border border-border bg-secondary/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setView({ type: "category", categoryId: cat.id })}
              className="premium-card hover-lift text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
                  <cat.icon size={18} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {cat.articles.length} article{cat.articles.length !== 1 ? "s" : ""}
                    {cat.quizzes ? ` · ${cat.quizzes.length} quiz${cat.quizzes.length !== 1 ? "zes" : ""}` : ""}
                  </p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="premium-card">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">More content coming soon</p>
              <p className="text-xs text-muted-foreground">Options trading, commodities, algorithmic strategies, and more.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category view
  if (view.type === "category") {
    const cat = categories.find((c) => c.id === view.categoryId)!;
    return (
      <div className="space-y-6 animate-fade-up">
        <button
          onClick={() => setView({ type: "library" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to Library
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
            <cat.icon size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{cat.title}</h1>
            <p className="text-sm text-muted-foreground">{cat.description}</p>
          </div>
        </div>

        {cat.articles.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Articles</h2>
            {cat.articles.map((article) => (
              <button
                key={article.id}
                onClick={() => setView({ type: "article", categoryId: cat.id, articleId: article.id })}
                className="w-full premium-card hover-lift text-left flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-medium text-sm">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{article.readTime} read</p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

        {cat.quizzes && cat.quizzes.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quizzes</h2>
            {cat.quizzes.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => {
                  resetQuiz();
                  setView({ type: "quiz", categoryId: cat.id, quizId: quiz.id });
                }}
                className="w-full premium-card hover-lift text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Brain size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="font-medium text-sm">{quiz.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{quiz.questions.length} questions</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Article view
  if (view.type === "article") {
    const cat = categories.find((c) => c.id === view.categoryId)!;
    const article = cat.articles.find((a) => a.id === view.articleId)!;

    return (
      <div className="space-y-6 animate-fade-up max-w-3xl">
        <button
          onClick={() => setView({ type: "category", categoryId: view.categoryId })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to {cat.title}
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">{article.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">{article.readTime} read · {cat.title}</p>
        </div>

        <div className="premium-card prose-content">
          {article.content.split("\n\n").map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**")) {
              return <h2 key={i} className="text-base font-semibold mt-6 mb-2">{block.replace(/\*\*/g, "")}</h2>;
            }
            if (block.startsWith("**")) {
              const title = block.match(/^\*\*(.*?)\*\*/)?.[1];
              const rest = block.replace(/^\*\*.*?\*\*\n?/, "");
              return (
                <div key={i} className="mt-5 mb-2">
                  <h3 className="text-sm font-semibold mb-1">{title}</h3>
                  {rest && (
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {rest.split("\n").map((line, j) => {
                        const bold = line.replace(/\*\*(.*?)\*\*/g, "___BOLD_START___$1___BOLD_END___");
                        if (bold.includes("___BOLD_START___")) {
                          const parts = bold.split(/(___BOLD_START___|___BOLD_END___)/);
                          let inBold = false;
                          return (
                            <span key={j} className="block">
                              {parts.map((part, k) => {
                                if (part === "___BOLD_START___") { inBold = true; return null; }
                                if (part === "___BOLD_END___") { inBold = false; return null; }
                                return inBold ? <strong key={k} className="text-foreground">{part}</strong> : <span key={k}>{part}</span>;
                              })}
                            </span>
                          );
                        }
                        return <span key={j} className="block">{line}</span>;
                      })}
                    </div>
                  )}
                </div>
              );
            }
            if (block.includes("\n-")) {
              const lines = block.split("\n");
              const intro = lines[0].startsWith("-") ? null : lines[0];
              const items = lines.filter((l) => l.startsWith("- "));
              return (
                <div key={i} className="mt-2">
                  {intro && <p className="text-sm text-muted-foreground mb-1">{intro}</p>}
                  <ul className="space-y-1">
                    {items.map((item, j) => {
                      const text = item.replace(/^- /, "");
                      const bold = text.replace(/\*\*(.*?)\*\*/g, "___BOLD_START___$1___BOLD_END___");
                      if (bold.includes("___BOLD_START___")) {
                        const parts = bold.split(/(___BOLD_START___|___BOLD_END___)/);
                        let inBold = false;
                        return (
                          <li key={j} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-foreground/30 mt-0.5">•</span>
                            <span>
                              {parts.map((part, k) => {
                                if (part === "___BOLD_START___") { inBold = true; return null; }
                                if (part === "___BOLD_END___") { inBold = false; return null; }
                                return inBold ? <strong key={k} className="text-foreground">{part}</strong> : <span key={k}>{part}</span>;
                              })}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-foreground/30 mt-0.5">•</span>
                          <span>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
            return <p key={i} className="text-sm text-muted-foreground leading-relaxed mt-2">{block}</p>;
          })}
        </div>
      </div>
    );
  }

  // Quiz view
  if (view.type === "quiz") {
    const cat = categories.find((c) => c.id === view.categoryId)!;
    const quiz = cat.quizzes!.find((q) => q.id === view.quizId)!;
    const score = quiz.questions.reduce((acc, q, i) => acc + (quizState.answers[i] === q.answer ? 1 : 0), 0);

    return (
      <div className="space-y-6 animate-fade-up max-w-2xl">
        <button
          onClick={() => setView({ type: "category", categoryId: view.categoryId })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to {cat.title}
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">{quiz.questions.length} questions</p>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((q, qi) => (
            <div key={qi} className="premium-card">
              <p className="text-sm font-medium mb-3">
                <span className="text-muted-foreground mr-2">{qi + 1}.</span>
                {q.q}
              </p>
              <div className="space-y-1.5">
                {q.options.map((opt, oi) => {
                  const selected = quizState.answers[qi] === oi;
                  const isCorrect = q.answer === oi;
                  let classes = "w-full text-left px-3 py-2 rounded-md text-sm border transition-colors ";
                  if (quizState.submitted) {
                    if (isCorrect) classes += "border-foreground/30 bg-foreground/5 font-medium";
                    else if (selected && !isCorrect) classes += "border-border bg-secondary/50 text-muted-foreground line-through";
                    else classes += "border-border/50 text-muted-foreground/50";
                  } else {
                    classes += selected
                      ? "border-foreground bg-foreground/5 font-medium"
                      : "border-border hover:border-foreground/30 hover:bg-secondary/50";
                  }
                  return (
                    <button
                      key={oi}
                      disabled={quizState.submitted}
                      onClick={() => setQuizState((s) => ({ ...s, answers: { ...s.answers, [qi]: oi } }))}
                      className={classes}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!quizState.submitted ? (
          <button
            onClick={() => setQuizState((s) => ({ ...s, submitted: true }))}
            disabled={Object.keys(quizState.answers).length < quiz.questions.length}
            className="px-6 py-2.5 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answers
          </button>
        ) : (
          <div className="premium-card flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Score: {score}/{quiz.questions.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {score === quiz.questions.length ? "Perfect score!" : score >= quiz.questions.length * 0.6 ? "Good job!" : "Keep studying!"}
              </p>
            </div>
            <button
              onClick={() => {
                resetQuiz();
                setView({ type: "category", categoryId: view.categoryId });
              }}
              className="text-sm border border-border px-4 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              Back to {cat.title}
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
