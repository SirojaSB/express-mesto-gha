# Серверная часть проекта: Mesto.

### Полный проект: https://github.com/SirojaSB/react-mesto-api-full

"Mesto" - Сервис, позволяющий пользователям делиться своими изображениями и оценивать чужие.

## Стек технологий:

- Expressjs
- nodemon
- MongoDB
- mongoose
- jsonwebtoken
- celebrate
- bcryptjs

## Методы и роуты

Метод | Роут | Описание
----- |------|---------
GET | `/users` | получить всех пользователей
GET | `/users/:userId` | поучить пользователя по _id
GET | `/users/me` | получить данные об авторизованном пользователе
PATCH | `/users/me` | обновляет информацию о пользователе
PATCH | `/users/me/avatar` | обновить аватар пользователя
POST | `/users` | создать пользователя
GET | `/cards` | получить все карточки
POST | `/cards` | создать карточку
DELETE | `/cards/:cardId` | удалить карточку по _id
PUT | `/cards/:cardId/likes` | лайк карточке
DELETE | `/cards/:cardId/likes` | дизлайк карточки
