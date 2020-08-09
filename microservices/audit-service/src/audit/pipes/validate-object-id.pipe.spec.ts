import { BadRequestException } from '@nestjs/common';

import { ValidateObjectId } from './validate-object-id.pipe';

describe('ValidateObjectId Pipe', () => {
    let pipe: ValidateObjectId;

    beforeEach(async () => {
        pipe = new ValidateObjectId();
    });

    it('should be defined', () => {
        expect(pipe).toBeDefined();
    });

    it('should be valid ObjectId', async () => {
        const id = '5f1dd6414ea0b923ee90f977';
        const res = await pipe.transform(id, null);
        expect(res).toBe(id);
    });

    it('should throw error when ObjectId is not valid', async () => {
        const id = '5f1dd6414ea0b923ee90hh';
        await expect(pipe.transform(id, null)).rejects.toEqual(new BadRequestException('Invalid ID!'));
    });
});