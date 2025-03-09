<a name="readme-top"></a>

<h3 align="center">Unveiled Bosnia</h3>
<p align="center">
    Tourist app
    <br />
    <br />
    <a href="https://bosnia-unveiled.vercel.app/swagger/">View Server docs</a>
    ·
    <a href="https://bosnia-unveiled-client.vercel.app">Demo</a>
    ·
    <a href="https://bosnia-unveiled.vercel.app/admin/">Admin login</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

A Full stack Web application showcasing lesser known natural and man made wonders of Bosnia & Herzegovina. Built by 3 students to showcase our skills and knowledge to potential employers. It is hosted on a free platform and serves as a portfolio piece for our CVs.

### Built With

This section contains all major frameworks and libraries that we used to develop this project. 

* [![React][React.js]][React-url]
* [![Typescript][TypeScript]][TypeScript-url]
* [![SassCSS][SassCSS]][SassCSS-url]
* [![Django][Django]][Django-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Swagger][Swagger]][Swagger-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

In this section we provided the prerequisites that are necessary to run the project.

### Prerequisites

The React app uses NPM as the package manager.
* npm
  ```sh
  npm install npm@latest -g
  ```

The Django server uses PIP as a package-managment system.
* pip
  ```sh
  python get-pip.py
  ```

### Installation

This guide will walk you through the steps to install and setup
Unveiled Bosnia on your local machine.

1. Get a free API Key at [https://openweathermap.org](https://openweathermap.org)
2. Clone the repo
   ```sh
   git clone https://github.com/kenansultanic/project.git
   ```
3. Install NPM packages in the client's root directory
   ```sh
   npm install
   ```
4. Install PIP packages in the server's root directory
   ```py
   pip install -r requirements.txt
   ```
5. Enter your API in your server's `.env` file
   ```env
   OPENWEATHERMAP_API_KEY = 'ENTER YOUR API'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Starting the project

1. Run the following command in the root's client folder
   ```sh
   npm start
   ```
2. Run the following commands in the root's server folder
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

<!-- CONTACT -->
## Contact
* Kenan Sultanić - [Kenan's LinkedIn](https://linkedin.com/in/kenansultanic/) - kenansultanic0805@gmail.com
* Demir Pašalić - [Demir's LinkedIn](https://www.linkedin.com/in/dpasalic/) - de.pasalicc@gmail.com
* Admira Bakal - [Admira's LinkedIn](https://www.linkedin.com/in/admira-bakal-591176238/) - admira.bakal@gmail.com

Project Link: [https://github.com/kenansultanic/project.git](https://github.com/kenansultanic/project.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/react-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff
[TypeScript-url]: https://www.typescriptlang.org/

[SassCSS]: https://img.shields.io/badge/sass-C76494?style=for-the-badge&logo=sass&logoColor=fff
[SassCSS-url]: https://sass-lang.com/

[Django]: https://img.shields.io/badge/django-113527?style=for-the-badge&logo=django&logoColor=fff
[Django-url]: https://www.djangoproject.com/

[PostgreSQL]: https://img.shields.io/badge/postgresql-376696?style=for-the-badge&logo=postgresql&logoColor=fff
[PostgreSQL-url]: https://www.postgresql.org/

[Swagger]: https://img.shields.io/badge/swagger-729D08?style=for-the-badge&logo=swagger&logoColor=fff
[Swagger-url]: https://swagger.io/

