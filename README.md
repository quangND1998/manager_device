
## Installation

Clone the repo locally:

```sh
https://github.com/quangND1998/inertiajs-base-project
cd inertiajs-base-project
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm install
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Run database migrations:

```sh
php artisan migrate
```

Run database seeder:

```sh
php artisan db:seed
```

Run the dev server (the output will give the address):

```sh
php artisan serve
```

Build vuejs :

```sh
npm run dev
```
```sh
npm run hot 
```
```sh
npm run watch 
```