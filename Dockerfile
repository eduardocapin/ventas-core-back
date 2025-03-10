# Etapa 1: Construcción
FROM node:21.7.0 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:21.7.0 

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

# Copiar el archivo .env
COPY .env .env  

RUN adduser --disabled-password mobentis
USER mobentis
EXPOSE 3000

# Usar el script de producción definido en package.json
CMD ["npm", "run", "start:prod"]