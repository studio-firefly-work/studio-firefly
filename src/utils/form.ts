export const form = {
  /**
   * フォームのフィールド情報からx-dataを生成する関数
   * @param {Theme.FormField[]} fields - フィールドの情報
   * @returns {string} - x-data
   */
  createXData: (fields: Theme.FormField[]): string => {
    const dataStr = fields
      .map(({ type, id }) => (type === 'checkbox' ? `${id}: []` : `${id}: ''`))
      .join(', ')

    const errStr = [fields.map(({ id }) => `${id}: ''`), "turnstile: ''"].join(', ')

    const validStr = fields
      .map(({ id, validations }) => {
        if (!validations) return '' // validationsが無ければ何もしない

        return `validate${id.charAt(0).toUpperCase() + id.slice(1)}() {
          let errorText = ''
          ${validations
            .map((validation: any) => {
              if (validation.pattern instanceof RegExp) {
                return `if (!${validation.pattern}.test(this.${id})) {
                  errorText = '${validation.text}'
                }`
              } else {
                return `if (!${validation.pattern}) {
                  errorText = '${validation.text}'
                }`
              }
            })
            .join(' else ')
          }
          if (errorText) {
            this.errors.${id} = errorText
          } else {
            delete this.errors.${id}
          }
        },`
      })
      .join('\n')

    const xData = `{
      step: 1,
      ${dataStr},
      errors: {
        ${errStr}
      },
      ${validStr}
    }`

    return xData
  },
}
