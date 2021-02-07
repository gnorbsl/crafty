FROM node:14-alpine as build

WORKDIR ./
COPY package*.json /
RUN npm install
COPY . .
RUN npm run build

FROM build as production
WORKDIR ./
ENV NODE_ENV=production
COPY package* ./
RUN npm install --production
COPY --from=build ./dist ./dist
COPY . /

EXPOSE ${PORT}
CMD ["npm", "start"]