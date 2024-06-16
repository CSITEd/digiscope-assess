import { useReCaptcha } from 'vue-recaptcha-v3'

export class RecaptchaAction {
  public static readonly login = new RecaptchaAction('login')
  private constructor(public readonly name: string) {}
}

export const useGoogleRecaptcha = () => {
  const recaptchaInstance = useReCaptcha()

  const executeRecaptcha = async (action: RecaptchaAction) => {
    await recaptchaInstance?.recaptchaLoaded()
    const token = await recaptchaInstance?.executeRecaptcha(action.name)
    const headerOptions = {
      headers: {
        'google-recaptcha-token': token,
      },
    }
    return { token, headerOptions }
  }

  return { executeRecaptcha }
}
