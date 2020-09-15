FROM node:12-alpine as base

WORKDIR /app
COPY . ./
RUN npm install
RUN npm audit fix
RUN npm run nx -- lint app1 || exit 1
RUN npm run nx -- test app1 || exit 1
RUN npm run nx -- build app1 --prod 

FROM node:12-alpine as prod-build
WORKDIR /app
COPY --from=base /app/package*.json ./
COPY --from=base /app/nx.json ./
COPY --from=base /app/workspace.json ./
COPY --from=base /app/dist/apps/app1 ./dist/apps/app1
# Add application user
#RUN useradd -u 8877 bench-app
# Change to non-root privilege
#USER bench-app
RUN npm install --prod
RUN npm audit fix
EXPOSE 4001
HEALTHCHECK CMD curl --fail http://localhost:4002/api/app1 || exit 1
CMD ["node","./dist/apps/app1/main.js"]
