# Weatherapp

There was a beautiful idea of building an app that would show the upcoming weather. The developers wrote a nice backend and a frontend following the latest principles and - to be honest - bells and whistles. However, the developers did not remember to add any information about the infrastructure or even setup instructions in the source code.

Luckily we now have [docker compose](https://docs.docker.com/compose/) saving us from installing the tools on our computer, and making sure the app looks (and is) the same in development and in production. All we need is someone to add the few missing files!

I've added updates into this Readme for things I managed to do for this exercise. Robot tests, cloud installation and ansible are not finished. There is a base for dockerized robot tests, but I couldn't manage to implement anything that useful. See notes below for instructions on running the project and update notes.

## Prerequisites
* [Docker](https://www.docker.com/) for running the projects in docker containers (Optional, but recommended)
* An [openweathermap](http://openweathermap.org/) API key.
    * On local machine, create an .env file inside `/backend` folder, and add the environment variable `APPID=[your_api_key]`. In a cloud environment, this should be configured as a secret in the service. 

## Returning your solution

### Via github

* Make a copy of this repository in your own github account (do not fork unless you really want to be public).
* Create a personal repository in github.
* Make changes, commit them, and push them in your own repository.
* Send us the url where to find the code.

### Via tar-package

* Clone this repository.
* Make changes and **commit them**.
* Create a **.tgz** -package including the **.git**-directory, but excluding the **node_modules**-directories.
* Send us the archive.

## Exercises

Here are some things in different categories that you can do to make the app better. Before starting you need to get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/). You can run the app locally using `npm i && npm start`.

### Docker

*Docker containers are central to any modern development initiative. By knowing how to set up your application into containers and make them interact with each other, you have learned a highly useful skill.*

* Add **Dockerfile**'s in the *frontend* and the *backend* directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first.
    * The backend and frontend projects both work in docker containers using the above commands. **NOTE:** Recommended way is to use docker-compose to build both containers with one command. See below for instructions. 

* Add a **docker-compose.yml** -file connecting the frontend and the backend, enabling running the app in a connected set of containers.
    * Both projects can be run simultaneously by running `docker-compose up ` in the root of this repository. Use `-d` flag for detached mode, if you do not want to see the terminals.

* The developers are still keen to run the app and its pipeline on their own computers. Share the development files for the container by using volumes, and make sure the containers are started with a command enabling hot reload.
    * The `docker-compose.yml` creates volumes for both projects and runs both containers with hot reload enabled. **NOTE:** Be sure to provide the API key as described in the prerequisites section above.

### Node and React development

*Node and React applications are highly popular technologies. Understanding them will give you an advantage in front- and back-end development projects.*

* The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

* There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.
    * Update 18.1.2020: There are still some errors for reasons I dot not understand. But the most annoying ones should now be cleared, so it's mostly good. Probably should update the linter rules etc. to get rid of the remaining ones.

* The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))
    * Update 18.1.2020: The app now reports the forecast by geolocation, if the user allows location to be used. An improvement would be to store the possible location in state and update the forecast data if the user suddenly decides to use location.

### Testing

*Test automation is key in developing good quality applications. Finding bugs in early stages of development is valuable in any software development project. With Robot Framework you can create integration tests that also serve as feature descriptions, making them exceptionally useful.*

* Create automated tests for the application. (tip: [mocha](https://mochajs.org/))
    * Update 18.1.2020: The frontend now has unit tests to showcase the principle. There could still be more unit tests and also tests for the backend as well. Run the tests by running `npm run test:unit` in the `frontend` folder to test frontend. 

* Create [Robot Framework](http://robotframework.org/) integration tests. Hint: Start by creating a third container that gives expected weather data and direct the backend queries there by redefining the **MAP_ENDPOINT**.
    * Update 18.1.2020: For clarity, the Robot tests live in `/robot`, where there is a Dockerfile and docker-compose. There is a folder structure in place for tests. However, there were some difficulties in getting RF to work in Docker, so this is still unfinished. The idea was to run RF tests in docker containers and get the output from tests into a dedicated folder. I was supposed to create a test that opens Chrome, navigates to the site and checks that the image on the site (current weather) is the correct one (img src="01.svg" for example), returned by the mocked endpoint 

### Cloud

*The biggest trend of recent times is developing, deploying and hosting your applications in cloud. Knowing cloud -related technologies is essential for modern IT specialists.*

* Set up the weather service in a free cloud hosting service, e.g. [AWS](https://aws.amazon.com/free/) or [Google Cloud](https://cloud.google.com/free/).

### Ansible

*Automating deployment processes saves a lot of valuable time and reduces chances of costly errors. Infrastructure as Code removes manual steps and allows people to concentrate on core activities.*

* Write [ansible](http://docs.ansible.com/ansible/intro.html) playbooks for installing [docker](https://www.docker.com/) and the app itself.

### Documentation

*Good documentation benefits everyone.*

* Remember to update the README

* Use descriptive names and add comments in the code when necessary

### ProTips

* When you are coding the application imagine that you are a freelancer developer developing an application for an important customer.

* The app must be ready to deploy and work flawlessly.

* The app must be easy to deploy to your local machine with and without Docker. 

* Detailed instructions to run the app should be included in your forked version because a customer would expect detailed instructions also.

* Structure the code and project folder structure in a modular and logical fashion for extra points.

* Try to avoid any bugs or weirdness in the operating logic.
