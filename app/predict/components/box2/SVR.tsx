import { StockData } from '../../../stocks/types';
import { Dayjs } from 'dayjs';
import { calculateVolatility } from './functions';
import { rfCalc } from './ML';
// async function trainModel() {
//   // Load the dataset
//   const dataset = tf.data.csv('file://path/to/housing-data.csv', {
//     columnConfigs: { price: { isLabel: true } }
//   });
//   // Prepare the data
//   const datasetSize = await dataset.size();
//   const shuffledDataset = dataset.shuffle(datasetSize);
//   // Split the data into training and testing sets
//   const trainSize = Math.floor(datasetSize * 0.8);
//   const testSize = datasetSize - trainSize;
//   const trainDataset = shuffledDataset.take(trainSize);
//   const testDataset = shuffledDataset.skip(trainSize);
//   // Define the model
//   const model = tf.sequential();
//   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
//   // Compile the model
//   model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
//   // Train the model
//   await model.fitDataset(trainDataset, {
//     epochs: 100,
//     validationData: testDataset
//   });

//   console.log('Training complete.');
//   // Make predictions
//   const size = tf.tensor([2000]);
//   const pricePrediction = model.predict(size);
//   pricePrediction.print();
// }

export const svrCalc = (
  data: StockData[],
  predictionDate: Dayjs
): StockData[] => {
  return rfCalc(data, predictionDate);
};
