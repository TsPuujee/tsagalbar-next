Монгол зурхайн аргаар бодсон дорнын зурхай
Цагаан сар тооцоологчтой
<https://tsagalbar.vercel.app/>

## Api description

- `GET /api?date=2025-02-28` - Get data by date and date is optional

  ```json
  {
    "data": {
      "date": "2025-02-28",
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

- `GET /api/lunar?year=2025` - Get lunar data by year and year is optional

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

## Example

- `curl https://tsagalbar.vercel.app/api`
- `curl https://tsagalbar.vercel.app/api?date=2023-05-23`
- `curl https://tsagalbar.vercel.app/api/lunar`
- `curl https://tsagalbar.vercel.app/api/lunar?year=2022`

## Screenshots

![Screenshot](https://tsagalbar.vercel.app/images/screenshot/s2.png)
![Screenshot](https://tsagalbar.vercel.app/images/screenshot/s1.png)
