# Важно
Необходимо создать .env файл в корне проекта на сервере. Пример заполнения находится в файле .env.example



# Как развернуть через докер frontend + backend
```
1. Установить всё необходимое на сервер: git, docker
2. Склонировать репозиторий на сервер и перейти в его каталог
3. Создать .env файл
4. Запустить командой docker-compose up -d // флаг -d опциональный, нужен для запуска на фоне
```

# Frontend отдельно:
```
1. Перейти в папку frontend
2. npm i
3. npm run start
```
# Backend отдельно:
```
1. В папке backend создать .env файл по примеру .env.example
2. npm i
3. npm run start
```




# Деплой демо:
```
Frontend https://student-sr-kpd.nomorepartiessbs.ru

Backend https://api.student-sr-kpd.nomorepartiessbs.ru
```
