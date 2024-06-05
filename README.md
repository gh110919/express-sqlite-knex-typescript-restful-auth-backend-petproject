http://localhost:3000/api/auth/signup - регистрация , ожидает объект:

```typescript
type TSignup = {
  username: string;
  password: string;
};
```

http://localhost:3000/api/auth/signin - авторизация , ожидает объект:

```typescript
type TSignin = {
  username: string;
  password: string;
};
```

http://localhost:3000/api/crud/users - пустой get-запрос возвращает всех пользователей , имеет полный crud-цикл
http://localhost:3000/api/crud/users/1 - get-запрос возвращает конкретного пользователя
