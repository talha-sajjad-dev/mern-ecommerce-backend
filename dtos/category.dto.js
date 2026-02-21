class CreateCategoryDto {
    constructor({ logo, values }) {
        logo && (this.logo = {
            url: logo.path,
            publicId: logo.filename,
        }),
        this.name = values.name,
        this.slug = values.slug,
        this.parentId = normalizeParentId(values.parentId),
        this.status = values.status
    }
}

function normalizeParentId(parentId) {
  if (!parentId) return null;
  return parentId;
}

export { CreateCategoryDto };