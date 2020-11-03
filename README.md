![Issues](https://img.shields.io/github/issues/samuelsilvadev/exchange-money?style=flat-square)
![MIT License](https://img.shields.io/github/license/samuelsilvadev/exchange-money?style=flat-square)
![Workflow](https://img.shields.io/github/workflow/status/samuelsilvadev/exchange-money/Deploy?style=flat-square)

<br />
<p align="center">
  <a href="https://github.com/samuelsilvadev/exchange-money">
      <img src="public/exchange-dollar-fill.png" alt="Money Exchange APP Logo" width="80" height="80">
  </a>

  <h3 align="center">Money Exchange APP</h3>

  <p align="center">
    Create personalized pockets and transfer money between them with the updated exchange rate.
    <br />
    <a href="https://github.com/samuelsilvadev/exchange-money"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://exchange-money-universal.herokuapp.com/" target="_blank">View Demo</a>
	·
    <a href="https://github.com/samuelsilvadev/exchange-money/issues">Report Bug</a>
    ·
    <a href="https://github.com/samuelsilvadev/exchange-money/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

-   [About the Project](#about-the-project)
    -   [Built With](#built-with)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

The project is a simple tool to help manage personal pockets with different
currencies. In a simple way you can transfer your money between your pockets and
get real time information about the current exchange rate of that currency.

### Built With

-   [razzle](https://github.com/jaredpalmer/razzle)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

-   node

You can follow the installation guide from the official documentation
[here](https://nodejs.org/en/)

-   npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/samuelsilvadev/exchange-money.git
```

2. Install NPM packages

```sh
npm install
```

3. Create an .env file

```sh
cp .env.sample .env
```

4. Update the `RAZZLE_OPEN_EXCHANGE_RATES_APP_ID` value in the .env file

```
API_BASE=your-app-id
```

Note: Currently we are using the
[openexchangerates](https://openexchangerates.org/account/usage) API, you only
need to create an APP there and put the newly app-id here.

## Contributing

Contributions are what make the open source community such an amazing place to
be learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/something-amazing`)
3. Commit your Changes (`git commit -m 'feat: Add something amazing'`)
4. Push to the Branch (`git push origin feature/something-amazing`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Samuel Silva - [@samuelsilvadev](https://twitter.com/samuelsilvadev) -
samuelsilvawb@gmail.com

Project Link:
[https://github.com/samuelsilvadev/exchange-money](https://github.com/samuelsilvadev/exchange-money)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

-   [Best README Template](https://github.com/othneildrew/Best-README-Template)
-   [Remixicon](https://remixicon.com/)
-   [Shields](https://shields.io/)
