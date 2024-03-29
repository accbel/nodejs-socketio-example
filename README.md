nodejs-socketio-example
=======================

Sample project to demonstrate a simple setup and implementation of a chat application using Node.JS + Socket.IO

Pre-requisites
-----------------------

* Install Node.js

        git clone git://github.com/joyent/node.git  
        cd node/
        ./configure
        make
        sudo make install

If you prefer, Node.js is also available as a native package. See [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

* Install NPM

        curl http://npmjs.org/install.sh | sh

How to run
-----------------------

* First of all, checkout the project (git needed) or download and extract it to a location of your choose.
* Then, `cd nodejs-socketio-example/` and `npm install`
* Check for possible dependency installation errors. If there are no errors, type `node server.js`
* Type in your browser `http://localhost:8080/`

**NOTE**: To allow access from remote clients, please follow:
* Open file `public/javascript/application.js`;
* At line 23, change the code `io.connect('http://localhost:8080')` to `io.connect('http://<YOUR PUBLIC IP>:8080')`;