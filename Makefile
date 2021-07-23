all:
	docker-compose up --build

dev:
	docker run -it -w /app/api -v `pwd`/src/:/app/api -p 8125:8125 -e NODE_ENV=development  node:14.5.0 /bin/sh -c "npm install && npm start"
