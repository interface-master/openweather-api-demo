FROM node:lts-alpine AS builder

WORKDIR /app

# Build Stage

COPY . .

RUN npm install

# COPY ["webpack.config.js", "tsconfig.json", "server.ts", "app.ts", "."]
# COPY ["./node_modules", "./node_modules"]
# COPY ["./react", "./react"]

# Build the React app
RUN npm run build --production


# Server Stage
FROM node:lts-alpine

# Copy Server package
COPY ["package.json", "package-lock.json", "server.ts", "app.ts", "./"]

RUN npm install --production

# Copy React UI
COPY --from=builder ["/app/dist", "/dist"]

# Set OpenWeather API Key Environment Variable
ARG API_KEY
ENV OPENWEATHERAPI_APPID=$API_KEY

EXPOSE 3000

CMD ["npm", "run", "serve"]
