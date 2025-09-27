Монгол зурхайн аргаар бодсон дорнын зурхай
Цагаан сар тооцоологчтой
<https://tsagalbar.vercel.app/>

## Суурилуулалт ба ажиллуулах

- Node.js 18+
- Yarn

```bash
yarn
yarn dev
```

Build хийх ба production эхлүүлэх:

```bash
yarn build
yarn start
```

## API

Доорх 2 endpoint-ыг GET болон POST хэлбэрээр дэмжинэ. Параметр өгөөгүй үед сервер тухайн өдрийн/оны мэдээллийг тооцоолж буцаана.

- Тайлбар:

  - `date` query/body нь `YYYY-MM-DD` форматтай байна.
  - `year` query/body нь `YYYY` форматтай байна.
  - Зурагны замууд `https://tsagalbar.vercel.app/images/...` хэлбэрээр буцна.
  - `/api` хариуны `data.date` нь серверийн өнөөдрийн огноог илэрхийлдэг; харин `data.data` хэсэг нь таны илгээсэн огнооны дагуух мэдээлэл байна.

- `GET /api?date=2025-02-28` — Өдрөөр мэдээлэл авах (date сонголттой)
- `POST /api` — Өдрөөр мэдээлэл авах (body-д `{"date": "YYYY-MM-DD"}`)

  ```json
  {
    "data": {
      "date": "YYYY-MM-DD",
      "data": {
        "jaran": 17,
        "jil": "хөх луу",
        "jil_cycle_name": "Хилэнт эм",
        "sar": "өвлийн сүүл ",
        "sar_menge": "гурван хөх",
        "sar_jil": "улаагчин үхэр",
        "odor_bilgiin_toolol": 30,
        "odor_suudal": "гал",
        "odor_menge": "есөн улаан",
        "odor_animal": "шар луу",
        "us_zasuulah": "Эрлэг лугаа учирна",
        "sar_image": "https://tsagalbar.vercel.app/images/1.png",
        "jil_image": "https://tsagalbar.vercel.app/images/4.png",
        "odor_image": "https://tsagalbar.vercel.app/images/4.png"
      }
    },
    "error": null
  }
  ```

- `GET /api/lunar?year=2025` — Жилийн (Цагаан сарын) мэдээлэл (year сонголттой)
- `POST /api/lunar` — Жилийн мэдээлэл (body-д `{"year": "YYYY"}`)

  ```json
  {
    "data": {
      "date": "2025",
      "data": {
        "cycle": 17,
        "year": "хөхөгчин могой",
        "animalNumber": 5,
        "annualFortune": "хоёр хар",
        "lunarNewYear": "2025/03/01",
        "dayColor": "шарагчин могой",
        "dayFortune": "найман цагаан",
        "seat": "шороо",
        "lastMonthNewMoon": "02/28 08:46",
        "jil_image": "https://tsagalbar.vercel.app/images/lunarImages/6.png"
      }
    },
    "error": null
  }
  ```

## Жишээ хүсэлтүүд

- `curl https://tsagalbar.vercel.app/api`
- `curl https://tsagalbar.vercel.app/api?date=2023-05-23`
- `curl https://tsagalbar.vercel.app/api/lunar`
- `curl https://tsagalbar.vercel.app/api/lunar?year=2022`

POST жишээ:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"date":"2025-02-28"}' \
  https://tsagalbar.vercel.app/api
```

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"year":"2025"}' \
  https://tsagalbar.vercel.app/api/lunar
```

## Screenshots

![Screenshot](https://tsagalbar.vercel.app/images/screenshot/s2.png)
![Screenshot](https://tsagalbar.vercel.app/images/screenshot/s1.png)
