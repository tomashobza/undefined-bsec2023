import { history } from './data';
export let restaurants: any = {};

history.forEach(rec => {
  // push to data structure
  if (!restaurants[rec.Restaurant]) {
    restaurants[rec.Restaurant] = {};
  }
  if (!restaurants[rec.Restaurant][rec.Food]) {
    restaurants[rec.Restaurant][rec.Food] = {
      arr: [],
      JVBaverage: 0,
    };
  }

  // vypocet JVB pro record
  rec['JVB'] = rec.Bolus+(rec.Result-rec.Initial);

  restaurants[rec.Restaurant][rec.Food].arr.push(rec);
});


console.log(restaurants);