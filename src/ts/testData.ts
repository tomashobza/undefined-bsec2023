import { getStorage } from "./storage";
import _ from "lodash-es"
import { getMealTypes, getRestaurants, saveMealRecord, saveMealType, saveRestaurant } from "./functions";
import dayjs from 'dayjs'
import plugin from "dayjs/plugin/customParseFormat"

dayjs.extend(plugin)

export function laodTestData() {
  getStorage().clear();

  console.info('Cleared storage')
  console.info('Loading ' + testData.length + ' records');

  const restaurantNames = testData.map(r => r.Restaurant)
  const restaurantNamesDeduped = _.uniq(restaurantNames)

  restaurantNamesDeduped.forEach(i => saveRestaurant(i, 0, 0))

  const mealTypes = _.uniqBy(testData, (r) => r.Food)

  mealTypes.forEach(mt => {
    const restaurantId = getRestaurants().find(i => i.name === mt.Restaurant)?.id

    if (!restaurantId) {
      console.error('Failed to find restaurant.');
      return;
    }

    saveMealType(restaurantId, mt.Food)
  })

  console.log(getStorage().data)

  // Not safe for different restaurants with same meal names
  testData.forEach(r => {
    const mealTypeId = getMealTypes().find((i => i.name === r.Food))?.id

    if (!mealTypeId) {
      console.error('Failed to find meal type.')
      return
    }

    let date = dayjs(r.Date, "DD-MM-YY")

    const hours_minutes = r.Time.split(":")

    date = date.set("hours", parseInt(hours_minutes[0]))
    date = date.set("minutes", parseInt(hours_minutes[1]))

    saveMealRecord(mealTypeId, r.Initial, r.Bolus, date, r.Result);
  })
}

export const testData = [
  {
    "Date": "16-01-23",
    "Time": "7:00",
    "Initial": 7.3,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "Toast menu 1 toast",
    "Result": 10.63
  },
  {
    "Date": "16-01-23",
    "Time": "14:00",
    "Initial": 8.2,
    "Bolus": 8,
    "Restaurant": "U Holise",
    "Food": "Katuv sleh",
    "Result": 9.31
  },
  {
    "Date": "16-01-23",
    "Time": "18:00",
    "Initial": 8.9,
    "Bolus": 10,
    "Restaurant": "CaPhe",
    "Food": "Bun Bo Nam Bo",
    "Result": 10.57
  },
  {
    "Date": "17-01-23",
    "Time": "6:30",
    "Initial": 6.8,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 6.8
  },
  {
    "Date": "17-01-23",
    "Time": "12:00",
    "Initial": 7.1,
    "Bolus": 10,
    "Restaurant": "Ctyrka",
    "Food": "Hovezi burger, hranolky",
    "Result": 8.43
  },
  {
    "Date": "17-01-23",
    "Time": "17:30",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "U Holise",
    "Food": "Kureci burger, hranolky",
    "Result": 10.83
  },
  {
    "Date": "18-01-23",
    "Time": "9:00",
    "Initial": 7.1,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 7.1
  },
  {
    "Date": "18-01-23",
    "Time": "14:00",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "Mc Royal, salat",
    "Result": 9.17
  },
  {
    "Date": "18-01-23",
    "Time": "19:30",
    "Initial": 8.9,
    "Bolus": 8,
    "Restaurant": "Cafe Louvre",
    "Food": "Kruti rizecky, br. Salat",
    "Result": 11.68
  },
  {
    "Date": "19-01-23",
    "Time": "9:00",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 7.8
  },
  {
    "Date": "19-01-23",
    "Time": "13:30",
    "Initial": 7.6,
    "Bolus": 8,
    "Restaurant": "Pizza Hut",
    "Food": "2 ks syrova pizza",
    "Result": 12.6
  },
  {
    "Date": "19-01-23",
    "Time": "18:00",
    "Initial": 10.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Pecivo, syr, salam",
    "Result": 10.5
  },
  {
    "Date": "20-01-23",
    "Time": "6:30",
    "Initial": 8.3,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 8.3
  },
  {
    "Date": "20-01-23",
    "Time": "11:00",
    "Initial": 7.9,
    "Bolus": 8,
    "Restaurant": "U Holise",
    "Food": "Veprove s 4 knedliky",
    "Result": 9.01
  },
  {
    "Date": "20-01-23",
    "Time": "17:30",
    "Initial": 8.5,
    "Bolus": 6,
    "Restaurant": "Ctyrka",
    "Food": "Spanelsky ptacek, brambory",
    "Result": 11.83
  },
  {
    "Date": "21-01-23",
    "Time": "8:00",
    "Initial": 7.2,
    "Bolus": 10,
    "Restaurant": "McDonnald",
    "Food": "Toast menu 2 toasty",
    "Result": 10.53
  },
  {
    "Date": "21-01-23",
    "Time": "12:00",
    "Initial": 8.1,
    "Bolus": 8,
    "Restaurant": "Maison Viet",
    "Food": "Sushi set 1",
    "Result": 10.32
  },
  {
    "Date": "21-01-23",
    "Time": "17:30",
    "Initial": 9.8,
    "Bolus": 6,
    "Restaurant": "Potraviny",
    "Food": "Syr, orisky, pecivo",
    "Result": 9.8
  },
  {
    "Date": "22-01-23",
    "Time": "9:00",
    "Initial": 7.9,
    "Bolus": 10,
    "Restaurant": "Hotel",
    "Food": "Anglicka snidane",
    "Result": 11.23
  },
  {
    "Date": "22-01-23",
    "Time": "14:00",
    "Initial": 8.1,
    "Bolus": 8,
    "Restaurant": "Maison Viet",
    "Food": "Sushi set 3",
    "Result": 13.66
  },
  {
    "Date": "22-01-23",
    "Time": "18:30",
    "Initial": 11.3,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "3 chlebicky",
    "Result": 16.3
  },
  {
    "Date": "23-01-23",
    "Time": "7:00",
    "Initial": 8.5,
    "Bolus": 8,
    "Restaurant": "Hotel",
    "Food": "Anglicka snidane",
    "Result": 14.06
  },
  {
    "Date": "23-01-23",
    "Time": "12:30",
    "Initial": 8.8,
    "Bolus": 10,
    "Restaurant": "Bistro FNOL",
    "Food": "Kureci rizoto",
    "Result": 9.8
  },
  {
    "Date": "23-01-23",
    "Time": "18:30",
    "Initial": 8.3,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "Mc Royal, hranolky",
    "Result": 12.74
  },
  {
    "Date": "24-01-23",
    "Time": "5:45",
    "Initial": 7.9,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 7.9
  },
  {
    "Date": "24-01-23",
    "Time": "11:30",
    "Initial": 6.8,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "2x Chees Burger",
    "Result": 10.13
  },
  {
    "Date": "24-01-23",
    "Time": "17:00",
    "Initial": 8.5,
    "Bolus": 10,
    "Restaurant": "McDonnald",
    "Food": "Mc Royal, salat",
    "Result": 9.5
  },
  {
    "Date": "25-01-23",
    "Time": "7:00",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Pecivo, syr, salam",
    "Result": 7.5
  },
  {
    "Date": "25-01-23",
    "Time": "12:30",
    "Initial": 7.8,
    "Bolus": 10,
    "Restaurant": "CaPhe",
    "Food": "Bun Bo Nam Bo",
    "Result": 9.47
  },
  {
    "Date": "25-01-23",
    "Time": "19:00",
    "Initial": 8.2,
    "Bolus": 10,
    "Restaurant": "Adria",
    "Food": "Svickova, 6 knedliku",
    "Result": 10.2
  },
  {
    "Date": "26-01-23",
    "Time": "9:15",
    "Initial": 7.4,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 7.4
  },
  {
    "Date": "26-01-23",
    "Time": "14:30",
    "Initial": 7.6,
    "Bolus": 8,
    "Restaurant": "Pizza Hut",
    "Food": "1 ks kureci pizza",
    "Result": 9.27
  },
  {
    "Date": "26-01-23",
    "Time": "19:30",
    "Initial": 8.5,
    "Bolus": 10,
    "Restaurant": "Cafe Louvre",
    "Food": "Veprove s 4 knedliky",
    "Result": 9.17
  },
  {
    "Date": "27-01-23",
    "Time": "8:00",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Omeleta se syrem",
    "Result": 7.5
  },
  {
    "Date": "27-01-23",
    "Time": "13:00",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "Sendvic s kurecim",
    "Result": 11.13
  },
  {
    "Date": "27-01-23",
    "Time": "18:00",
    "Initial": 8.3,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "Syr, orisky, pecivo",
    "Result": 8.3
  },
  {
    "Date": "28-01-23",
    "Time": "8:00",
    "Initial": 6.5,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 6.5
  },
  {
    "Date": "28-01-23",
    "Time": "12:30",
    "Initial": 7,
    "Bolus": 8,
    "Restaurant": "U Holise",
    "Food": "Svickova, 4 knedliky",
    "Result": 8.11
  },
  {
    "Date": "28-01-23",
    "Time": "18:30",
    "Initial": 7.1,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "Syr, salam, pecivo",
    "Result": 7.1
  },
  {
    "Date": "29-01-23",
    "Time": "8:00",
    "Initial": 6.6,
    "Bolus": 6,
    "Restaurant": "McDonnald",
    "Food": "Toast menu 1 toast",
    "Result": 16.6
  },
  {
    "Date": "29-01-23",
    "Time": "14:30",
    "Initial": 7.8,
    "Bolus": 10,
    "Restaurant": "NONA",
    "Food": "Sendvič s tuňákem",
    "Result": 8.8
  },
  {
    "Date": "29-01-23",
    "Time": "17:00",
    "Initial": 8.2,
    "Bolus": 8,
    "Restaurant": "Ctyrka",
    "Food": "Svíčkvá, 4 knedlíky",
    "Result": 9.31
  },
  {
    "Date": "30-01-23",
    "Time": "9:00",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "Toast menu 1 toast",
    "Result": 11.13
  },
  {
    "Date": "30-01-23",
    "Time": "13:30",
    "Initial": 8.5,
    "Bolus": 10,
    "Restaurant": "U Holise",
    "Food": "Řízek v bramboráku",
    "Result": 9.5
  },
  {
    "Date": "30-01-23",
    "Time": "18:30",
    "Initial": 8.4,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Vietnamska bageta",
    "Result": 10.62
  },
  {
    "Date": "31-01-23",
    "Time": "7:30",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 7.5
  },
  {
    "Date": "31-01-23",
    "Time": "11:00",
    "Initial": 7.6,
    "Bolus": 8,
    "Restaurant": "Ctyrka",
    "Food": "Spanelsky ptacek, brambory",
    "Result": 8.71
  },
  {
    "Date": "31-01-23",
    "Time": "17:00",
    "Initial": 8.1,
    "Bolus": 10,
    "Restaurant": "U Holise",
    "Food": "Kureci burger, hranolky",
    "Result": 10.1
  },
  {
    "Date": "01-02-23",
    "Time": "7:30",
    "Initial": 6.8,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 6.8
  },
  {
    "Date": "01-02-23",
    "Time": "11:30",
    "Initial": 7.1,
    "Bolus": 6,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 7.1
  },
  {
    "Date": "01-02-23",
    "Time": "17:00",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Adria",
    "Food": "Svickova, 4 knedliky",
    "Result": 8.61
  },
  {
    "Date": "02-02-23",
    "Time": "8:00",
    "Initial": 6.8,
    "Bolus": 6,
    "Restaurant": "CaPhe",
    "Food": "Plnena omeleta",
    "Result": 6.8
  },
  {
    "Date": "02-02-23",
    "Time": "13:00",
    "Initial": 7.1,
    "Bolus": 10,
    "Restaurant": "Pizza Hut",
    "Food": "2 ks samalova pizza",
    "Result": 10.1
  },
  {
    "Date": "02-02-23",
    "Time": "18:00",
    "Initial": 9.5,
    "Bolus": 6,
    "Restaurant": "Cafe Louvre",
    "Food": "Omeleta se sunkou a syrem",
    "Result": 7.83
  },
  {
    "Date": "03-02-23",
    "Time": "7:00",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Pecivo, syr, salam",
    "Result": 7.8
  },
  {
    "Date": "03-02-23",
    "Time": "14:00",
    "Initial": 8.1,
    "Bolus": 10,
    "Restaurant": "U Holise",
    "Food": "Svickova, 4 knedliky",
    "Result": 8.77
  },
  {
    "Date": "03-02-23",
    "Time": "19:00",
    "Initial": 8.5,
    "Bolus": 8,
    "Restaurant": "Ctyrka",
    "Food": "Smazeny kvetak, hranolky",
    "Result": 11.83
  },
  {
    "Date": "04-02-23",
    "Time": "8:00",
    "Initial": 6.9,
    "Bolus": 8,
    "Restaurant": "Hotel",
    "Food": "Anglicka snidane",
    "Result": 12.46
  },
  {
    "Date": "04-02-23",
    "Time": "11:00",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "Maison Viet",
    "Food": "Sushi set 1",
    "Result": 10.02
  },
  {
    "Date": "04-02-23",
    "Time": "20:30",
    "Initial": 9.5,
    "Bolus": 10,
    "Restaurant": "Potraviny",
    "Food": "Sendvic s kurecim",
    "Result": 11.5
  },
  {
    "Date": "05-02-23",
    "Time": "11:00",
    "Initial": 7.7,
    "Bolus": 10,
    "Restaurant": "Hotel",
    "Food": "Anglicka snidane",
    "Result": 11.03
  },
  {
    "Date": "05-02-23",
    "Time": "16:00",
    "Initial": 8.5,
    "Bolus": 10,
    "Restaurant": "McDonnald",
    "Food": "2x Chees Burger",
    "Result": 10.5
  },
  {
    "Date": "05-02-23",
    "Time": "19:00",
    "Initial": 8.9,
    "Bolus": 8,
    "Restaurant": "McDonnald",
    "Food": "Mc Royal, salat",
    "Result": 10.57
  },
  {
    "Date": "06-02-23",
    "Time": "7:00",
    "Initial": 7.2,
    "Bolus": 10,
    "Restaurant": "McDonnald",
    "Food": "Toast menu 2 toasty",
    "Result": 10.53
  },
  {
    "Date": "06-02-23",
    "Time": "13:00",
    "Initial": 8.4,
    "Bolus": 8,
    "Restaurant": "Bistro FNOL",
    "Food": "2 chlebicky",
    "Result": 10.62
  },
  {
    "Date": "06-02-23",
    "Time": "18:00",
    "Initial": 8.3,
    "Bolus": 10,
    "Restaurant": "Potraviny",
    "Food": "3 chlebicky",
    "Result": 11.3
  },
  {
    "Date": "07-02-23",
    "Time": "8:00",
    "Initial": 6.8,
    "Bolus": 10,
    "Restaurant": "Doma",
    "Food": "Sendvic s kurecim",
    "Result": 7.13
  },
  {
    "Date": "07-02-23",
    "Time": "12:00",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "CaPhe",
    "Food": "Bun Bo Nam Bo",
    "Result": 10.28
  },
  {
    "Date": "07-02-23",
    "Time": "18:00",
    "Initial": 8.2,
    "Bolus": 8,
    "Restaurant": "Adria",
    "Food": "Smazeny kvetak, hranolky",
    "Result": 10.42
  },
  {
    "Date": "08-02-23",
    "Time": "7:30",
    "Initial": 7.5,
    "Bolus": 10,
    "Restaurant": "CaPhe",
    "Food": "Vietnamska bageta",
    "Result": 8.83
  },
  {
    "Date": "08-02-23",
    "Time": "15:30",
    "Initial": 6.8,
    "Bolus": 6,
    "Restaurant": "Pizza Hut",
    "Food": "1 ks kureci pizza",
    "Result": 11.8
  },
  {
    "Date": "08-02-23",
    "Time": "20:30",
    "Initial": 7.8,
    "Bolus": 8,
    "Restaurant": "Cafe Louvre",
    "Food": "Kruti rizecky, br. Salat",
    "Result": 10.58
  },
  {
    "Date": "09-02-23",
    "Time": "7:30",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 7.5
  },
  {
    "Date": "09-02-23",
    "Time": "12:30",
    "Initial": 8.1,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Sendvic s kurecim",
    "Result": 8.66
  },
  {
    "Date": "09-02-23",
    "Time": "18:00",
    "Initial": 8.5,
    "Bolus": 10,
    "Restaurant": "Doma",
    "Food": "Pecivo, syr, salam",
    "Result": 8.5
  },
  {
    "Date": "10-02-23",
    "Time": "8:00",
    "Initial": 6.8,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 6.8
  },
  {
    "Date": "10-02-23",
    "Time": "13:00",
    "Initial": 7.2,
    "Bolus": 10,
    "Restaurant": "U Holise",
    "Food": "Veprove s 4 knedliky",
    "Result": 7.87
  },
  {
    "Date": "10-02-23",
    "Time": "18:00",
    "Initial": 7.5,
    "Bolus": 10,
    "Restaurant": "Moon",
    "Food": "Rýžové nudle s kuřetem",
    "Result": 9.5
  },
  {
    "Date": "11-02-23",
    "Time": "6:45",
    "Initial": 6.6,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 6.6
  },
  {
    "Date": "11-02-23",
    "Time": "11:30",
    "Initial": 7.1,
    "Bolus": 10,
    "Restaurant": "NONA",
    "Food": "Sendvic s kurecim",
    "Result": 8.1
  },
  {
    "Date": "11-02-23",
    "Time": "19:00",
    "Initial": 7.7,
    "Bolus": 10,
    "Restaurant": "Doma",
    "Food": "Pizza",
    "Result": 9.7
  },
  {
    "Date": "12-02-23",
    "Time": "10:00",
    "Initial": 7.5,
    "Bolus": 10,
    "Restaurant": "McDonnald",
    "Food": "Mc Royal, hranolky",
    "Result": 10.17
  },
  {
    "Date": "12-02-23",
    "Time": "14:00",
    "Initial": 8.3,
    "Bolus": 10,
    "Restaurant": "Maison Viet",
    "Food": "Sushi set 3",
    "Result": 11.63
  },
  {
    "Date": "12-02-23",
    "Time": "18:00",
    "Initial": 8.9,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "Syr, salam, pecivo",
    "Result": 8.9
  },
  {
    "Date": "13-02-23",
    "Time": "7:00",
    "Initial": 7.6,
    "Bolus": 8,
    "Restaurant": "Hotel",
    "Food": "Anglicka snidane",
    "Result": 13.16
  },
  {
    "Date": "13-02-23",
    "Time": "13:00",
    "Initial": 8.2,
    "Bolus": 10,
    "Restaurant": "Maison Viet",
    "Food": "Sushi set 1",
    "Result": 9.53
  },
  {
    "Date": "13-02-23",
    "Time": "17:00",
    "Initial": 9.5,
    "Bolus": 10,
    "Restaurant": "Potraviny",
    "Food": "3 chlebicky",
    "Result": 12.5
  },
  {
    "Date": "14-02-23",
    "Time": "7:30",
    "Initial": 7.5,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 7.5
  },
  {
    "Date": "14-02-23",
    "Time": "14:00",
    "Initial": 7.7,
    "Bolus": 10,
    "Restaurant": "CaPhe",
    "Food": "Bun Bo Nam Bo",
    "Result": 9.37
  },
  {
    "Date": "14-02-23",
    "Time": "19:30",
    "Initial": 7.6,
    "Bolus": 8,
    "Restaurant": "Adria",
    "Food": "Kureci stehna, zeli, brambory",
    "Result": 8.71
  },
  {
    "Date": "14-02-23",
    "Time": "6:30",
    "Initial": 6.8,
    "Bolus": 8,
    "Restaurant": "Doma",
    "Food": "Bebe Dobre rano",
    "Result": 6.8
  },
  {
    "Date": "14-02-23",
    "Time": "12:30",
    "Initial": 7.2,
    "Bolus": 8,
    "Restaurant": "Pizza Hut",
    "Food": "2 ks syrova pizza",
    "Result": 12.2
  },
  {
    "Date": "14-02-23",
    "Time": "18:30",
    "Initial": 7.9,
    "Bolus": 8,
    "Restaurant": "Potraviny",
    "Food": "Syr, salam, pecivo",
    "Result": 7.9
  }
];