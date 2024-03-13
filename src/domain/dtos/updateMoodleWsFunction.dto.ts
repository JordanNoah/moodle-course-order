export class UpdateMoodleWsFunctionDto {
    private constructor(
        public id: number,
        public moodleFunction: string,
        public abbreviation: string
    ) {}

    static create(object: {[key:string]:any}):[string?,UpdateMoodleWsFunctionDto?]{
        const {
            id,
            moodleFunction,
            abbreviation
        } = object

        if(!id) return ['Missing id key']
        if(!moodleFunction) return ['Missing moodleFunction key']
        if(!abbreviation) return ['Missing abbreviation key']

        return [
            undefined,
            new UpdateMoodleWsFunctionDto(
                id,
                moodleFunction,
                abbreviation
            )
        ]
    }
}