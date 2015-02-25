Live-Dash
=========

Live updating dashboard of postback data using socket.io

Setup
-----
To get the dependencies ready
```
sudo apt-get update
sudo apt-get install nodejs npm
sudo ln -s "$(which nodejs)" /usr/bin/node
sudo npm install --save express@4.10.2
sudo npm install --save socket.io
sudo npm install forever -g
```
To start it
```
forever start index.js
```
To add it behind nginx, configure it like so
```
http {
    upstream interface {
        server 127.0.0.1:8080;
        keepalive 8;
    }
    
    location /ld/ {
            proxy_pass http://interface;
        }
    }
}

```
