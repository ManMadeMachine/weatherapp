FROM ubuntu:latest

# These are here to make tzdata complete without interaction, so that the image creation doesn't hang
ENV TZ=Europe/Helsinki
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get -q -y install python3 python3-pip unzip wget curl

#RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3 get-pip.py

RUN python3 -m pip install -U pip

# Use a requirements file to install packages with pip
COPY requirements.txt /tmp/requirements.txt

RUN pip install -r /tmp/requirements.txt

# Download latest stable Chrome
RUN wget --no-verbose https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# install latest stable Chrome 
RUN dpkg --install google-chrome-stable_current_amd64.deb; apt-get --fix-broken --assume-yes install

# Install latest chromedriver for testing
RUN CHROMEDRIVER_VERSION=`wget --no-verbose --output-document - https://chromedriver.storage.googleapis.com/LATEST_RELEASE` && \
    wget --no-verbose --output-document /tmp/chromedriver_linux64.zip http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip && \
    unzip -qq /tmp/chromedriver_linux64.zip -d /opt/chromedriver && \
    chmod +x /opt/chromedriver/chromedriver && \
    ln -fs /opt/chromedriver/chromedriver /usr/local/bin/chromedriver

ENTRYPOINT [ './run_tests.sh' ]