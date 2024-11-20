export const form = {
  /**
   * フォームのフィールド情報からx-dataを生成する関数
   * @param {Object[]} fields - フィールドの情報
   * @returns {string} - x-data
   */
  createXData: (fields: Object[]) => {
    const dataStr = fields
      .map((field: any) => (field.type === 'checkbox' ? `${field.id}: []` : `${field.id}: ''`))
      .join(', ')

    const errStr = fields.map((field: any) => `${field.id}: ''`).join(', ')

    const validStr = fields
      .map((field: any) => {
        if (!field.validations) {
          return '' // validationsが無ければ何もしない
        }

        return `validate${field.id.charAt(0).toUpperCase() + field.id.slice(1)}() {
          let errorText = ''
        ${field.validations
          .map((validation: any) => {
            if (validation.pattern instanceof RegExp) {
              return `if (!${validation.pattern}.test(this.${field.id})) {
              errorText = '${validation.text}'
            }`
            } else {
              return `if (!${validation.pattern}) {
              errorText = '${validation.text}'
            }`
            }
          })
          .join(' else ')}
          if (errorText) {
            this.errors.${field.id} = errorText
          } else {
            delete this.errors.${field.id}
          }
        },`
      })
      .join('\n')

    const xData = `{
      step: 1,
      recaptchaToken: '',
      ${dataStr},
      errors: {
        ${errStr}
      },
      ${validStr}
      async submitForm(event) {
        event.preventDefault();
        this.recaptchaToken = await grecaptcha.execute('${import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}', { action: 'submit' });
        console.log(this.recaptchaToken);
      }
    }`

    return xData
  },
}
