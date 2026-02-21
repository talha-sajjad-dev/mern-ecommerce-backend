class OptionResponseDto {
    static fromOption(option) {
        return {
            id: option._id,
        }
    }
}

class CreateOptionDto {
    constructor(option) {
        this.name = option.name,
        this.values = option.variants.map(({ value, ...opt}) => ({ ...opt, label: value, })),
        this.displayType = option.displayType,
        this.status = option.status
    }
}


export { CreateOptionDto, OptionResponseDto };