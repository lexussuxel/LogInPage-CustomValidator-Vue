import { type Ref } from 'vue'

export class FormValidator<T> {
  items: ItemObject<T>
  errors: Errors<T>
  // itemsRefs: ItemRefObject<T> | undefined
  constructor(object: ItemObject<T>) {
    this.items = object
    const errorsArr = (Object.keys(object) as Array<keyofT<T>>).map((key: keyofT<T>) => ({ [key]: [] }));
    this.errors = Object.assign(
        {}, ...errorsArr
    )
  }

  validate() {
    const identityObj: IdentityObj<T> = {}
    const errorsArr = (Object.keys(this.items) as Array<keyofT<T>>).map((key: keyofT<T>) => ({ [key]: [] }));
    this.errors = Object.assign(
        {}, ...errorsArr
    )
    this.errors = Object.assign( {}, 
      ...(Object.entries(this.items) as Array<[keyofT<T>, ItemFullProps]>)
        .map((entrie) => {
          const variable = entrie[1]
          let errorsArr: string[] = []
          for (const [key, val] of Object.entries(variable.restrictions)) {
            if (key === 'identity' && typeof val !== 'boolean') {
              if (identityObj[val])
                identityObj[val] = [
                  ...identityObj[val],
                  { value: variable.value.value, id: entrie[0] }
                ]
              else identityObj[val] = [{ value: variable.value.value, id: entrie[0] }]
              continue;
            }
            const validated = KEYS_TO_FUNCTIONS[key as keyof ItemProps](variable.value.value, val)
            if (typeof validated === 'string') errorsArr = [...errorsArr, validated]
          }
          return ({[entrie[0]]: errorsArr})
        })
        .filter((a) => a !== undefined)
    )
    for(const [key, val] of Object.entries(identityObj)){
        if(!val.every((el) => el.value === val[0].value)){
            val.forEach((el) => {
                this.errors[el.id] = [...this.errors[el.id], `нессответствие с полем ${key}`]
            })
        }
    }
    if((Object.values(this.errors) as string[]).filter((val) => val.length !== 0).length)
        return false;
    return true;
  }
}

type keyofT<T> = keyof T

interface ItemProps {
  required: boolean
  max: number
  min: number
  email: boolean
  identity: string
}

type RefType = Ref<string> | Ref<number>

type Errors<T> = {
  [key in keyofT<T>]: string[]
}

type IdentityItem<T> = {
  id: keyofT<T>
  value: string | number
}

interface IdentityObj<T> {
  [key: string]: IdentityItem<T>[]
}

interface ItemFullProps {
  value: RefType
  restrictions: Partial<ItemProps>
}

type ItemObject<T> = {
  [key in keyof T]: ItemFullProps
}

const maxLengthValidator = (value: string | number, max: number | string | boolean) => {
  if (typeof value === 'string') {
    return value.length > +max ? `длина не должна превышать ${max} символов` : false
  }
  return value > +max ? `величина не должна превышать ${max}` : false
}

const minLengthValidator = (value: string | number, min: number | string | boolean) => {
  if (typeof value === 'string') {
    return value.length < +min ? `длина должна быть больше ${min} символов` : false
  }
  return value < +min ? `величина не должна быть больше ${min}` : false
}

const requiredValidator = (value: string | number) => {
  if (value === '') return 'это поле обязательное'
  return false
}

const emailValidator = (value: string | number) => {
  if (typeof value === 'string') {
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return false
  }
  return 'некорректный email'
}

const passwordValidator = (value1: string | number, value2: string | number | boolean) => {
  if (value1 === value2) return false
  return 'пароли не совпадают'
}

const KEYS_TO_FUNCTIONS: KeysToFunctionsType = {
  required: requiredValidator,
  max: maxLengthValidator,
  min: minLengthValidator,
  email: emailValidator,
  identity: passwordValidator
}

type KeysToFunctionsType = {
  [key in keyof ItemProps]: (
    arg1: string | number,
    arg2: string | number | boolean
  ) => string | boolean
}
