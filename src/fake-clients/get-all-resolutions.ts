/* eslint-disable @typescript-eslint/no-explicit-any */
import { sleep } from '../utils';
import dataJson from './data.json';

const data: { [key: string]: any } = dataJson;

export enum FakeServices {
    Resolutions = 'api/v1/resolutions',
    Status = 'api/v1/status',
    Investments = 'api/v1/investments',
    MaterialTypes = 'api/v1/material-categories',
}

const faker = async (model: FakeServices): Promise<any> => {
    console.info('Fake API call to:', model);
    await sleep(200);
    return data[model];
};

export default faker;
