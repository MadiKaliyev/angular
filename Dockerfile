# Базовый образ
FROM node:20

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем Angular-приложение
RUN npm run build

# По умолчанию запуск контейнера ничего не делает (только сборка)
CMD [ "echo", "Docker build completed." ]
