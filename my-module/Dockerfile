# ==============================
# BUILD STAGE
# ==============================
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

# Assicuriamoci che la build punti a root
ARG VITE_APP_ENV=prod
ENV VITE_APP_ENV=$VITE_APP_ENV

RUN pnpm build --mode prod


# ==============================
# RUN STAGE
# ==============================
FROM nginx:alpine

# Copia i file buildati
COPY --from=build /app/dist /usr/share/nginx/html

# Configurazione Nginx per root, SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]