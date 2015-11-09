# Development Environment Setup
We're using Docker. In brief, Docker is a system for lightweight
virtualization. This will allow everyone the ease of local development while
still maintaining a consistent development environment. This way everyone can
test their code as they work on it, as it would run on the server, but without
the hassle of dealing with a server. If you want to know more about Docker, read
their website.
https://www.docker.com

## 1. Install Docker Toolbox
https://www.docker.com/toolbox  
You don't need to click either of the icons at the end of the install dialog,
just close it.

## 2. Create a Docker Machine
A *Machine* is a lightweight VM setup with Docker Engine.

```bash
# creates a machine named machine1
docker-machine create -d virtualbox machine1

# sets env vars for docker client that specify how to connect to the machine
# repeat this step when you close and reopen a terminal window
eval "$(docker-machine env machine1)"
```

## 3. Run Hello World Container
*This is just to get everyone started and on the same page.*  
```bash
## hello-world name of a docker image
## --rm remove the container after it stops running (no point in keeping)
docker run --rm hello-world
```
You should see a clear success message.
