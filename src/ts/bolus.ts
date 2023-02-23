import type { Food, HistoryRecord } from './data';

export const calculateBolus = (food: Food) => {
  const x: number[] = [];
  const y: number[] = [];
  const x2: number[] = [];
  const xy: number[] = [];
  const jvbs: number[] = [];

  food.arr.forEach((foodRecord: HistoryRecord) => {
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

  const b = (x.length*sumXY - sumX*sumY)/(x.length*sumX2 - sumX*sumX) || 0;
  const a = (sumY - b*sumX)/x.length;

  (food as any)['a'] = a;
  (food as any)['b'] = b;
  (food as any)['avgJVB'] = avgJVB;
}