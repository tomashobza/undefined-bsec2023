import type { Food, HistoryRecord } from './data';

export const calculateBolus = (food: Food) => {
  // least square calculations
  const x: number[] = [];
  const y: number[] = [];
  const x2: number[] = [];
  const xy: number[] = [];
  const jvbs: number[] = [];

  food.arr.forEach((foodRecord: HistoryRecord) => {
    if (!foodRecord?.Result || !foodRecord?.Initial || !foodRecord?.Bolus) return; // food record not complete

    x.push(foodRecord.Result-foodRecord.Initial);
    x2.push((foodRecord.Result-foodRecord.Initial)*(foodRecord.Result-foodRecord.Initial));
    y.push(foodRecord.Bolus);
    xy.push((foodRecord.Result-foodRecord.Initial)*foodRecord.Bolus);
    jvbs.push(foodRecord.Bolus+(foodRecord.Result-foodRecord.Initial));
  });

  const sumXY = xy.reduce((a, v) => a+v);
  const sumX = x.reduce((a, v) => a+v);
  const sumX2 = x2.reduce((a, v) => a+v);
  const sumY = y.reduce((a, v) => a+v);
  const avgJVB = jvbs.reduce((a, v) => a+v) / jvbs.length;

  // calculate y=mx+b for bolus
  const b = (x.length*sumXY - sumX*sumY)/(x.length*sumX2 - sumX*sumX) || 0;
  const a = (sumY - b*sumX)/x.length;

  // write calculated data to data structure
  (food as any)['a'] = a;
  (food as any)['b'] = b;
  (food as any)['avgJVB'] = avgJVB;
}