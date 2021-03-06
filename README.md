# Простой портал для электронного обучения

## Требования к системе
  * Приложение должно позволять пользователю регистрироваться либо в роли студента, либо в роли преподавателя.
  * Приложение должно позволять пользователю-преподавателю создавать, редактировать и удалять свои курсы, добавлять задания в свои курсы, прикреплять ссылку на задание, просматривать присланные задания, смотреть профиль.
  * Приложение должно позволять просматривать пользователю-студенту выбирать курсы для прохождения, просматривать выбранные курсы и задания в них, отправлять ссылку на выполненное задание, а также просматривать профиль.
  * Все данные о пользователе должны храниться в sessionStorage браузера в формате JSON.
  * Каждый курс должен содержать название, описание, постер (для просмотра - имя преподавателя и его почта).
  * При клике на курс должны показываться задания к курсу (название, краткое описание, ссылка на задание, присланные ответы на задание (для преподавателей), отправленные ответы на задание (для студентов)).
  * До загрузки страницы должен использоваться Loader, для разгрузки страниц курсов и заданий должна использоваться пагинация.
  * Верстка на странице должна быть адаптивной к разным устройствам.

  ## Стек технологий/библиотек (Front-end)
    * Vue.js
    * Vuetify
    * SCSS
    * Bootstrap
    * Axios
    * Vue-meta
    * Material Design Icon

  ## Стек технологий/библиотек (Back-end)
    * Node.js
    * Express / Express Validator
    * Cloudinary
    * CORS
    * Morgan
    * БД: PostgreSQL
    
  ## Логическая структура БД

![alt text](https://raw.githubusercontent.com/vladistarshinov/pevn-education-portal/master/server/db/database.PNG)

  ## Основные команды
    ```
    npm run app -- Запустить проект
    ```
    ```
    npm run install_modules -- Установить пакеты 
    ```
    ```
    npm run server -- Запустить сервер 
    ```
    ```
    npm run client -- Запустить Клиент
    ```
