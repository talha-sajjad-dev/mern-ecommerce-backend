class CreateBrandDto {
    constructor({ logo, values }) {
        logo && (this.logo = {
            url: logo.path,
            publicId: logo.filename,
        }),
        this.name = values.name,
        this.status = values.status
    }
}

export { CreateBrandDto };