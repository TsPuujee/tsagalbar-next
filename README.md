Монгол зурхайн аргаар бодсон дорнын зурхай
Цагаан сар тооцоологчтой
<https://tsagalbar.vercel.app/>

## Api description

- `GET /api?date=2023-05-23` - Get data by date and date is optional

  ```json
  {
    "data": {
      "date": "2023-05-23",
      "data": {
        "jaran": 17,
        "jil": "харагчин туулай",
        "jil_cycle_name": "Үзэсгэлэнт болгогч",
        "sar": "зуны эхэн ",
        "sar_menge": "таван шар",
        "sar_jil": "улаагчин могой",
        "odor_bilgiin_toolol": 4,
        "odor_suudal": "шороо",
        "odor_menge": "найман цагаан",
        "odor_animal": "цагаагчин могой",
        "us_zasuulah": "Бие эрхтний хүч сайжирна",
        "sar_image": "https://tsagalbar.vercel.app/images/5.png",
        "jil_image": "https://tsagalbar.vercel.app/images/3.png",
        "odor_image": "https://tsagalbar.vercel.app/images/5.png"
      }
    },
    "error": null
  }
  ```

- `GET /api/lunar?year=2022` - Get lunar data by year and year is optional

  ```json
  {
    "data": {
      "date": "2030",
      "data": {
        "Жаран": 17,
        "Жил": "цагаан нохой",
        "animal_number": 10,
        "Жилийн_мэнгэ": "зургаан цагаан",
        "Шинийн_нэгэн": "2030/II/03 Ням",
        "Өдрийн_өнгө": "шарагчин могой",
        "Өдрийн_мэнгэ": "найман цагаан",
        "Суудал": "шороо",
        "Битүүний_сар": "II/03 - 00ц 10м",
        "jil_image": "https://tsagalbar.vercel.app/images/lunarImages/11.png"
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
