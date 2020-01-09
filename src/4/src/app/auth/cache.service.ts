export abstract class CacheService {
  protected getItem<T>(key: string): T {
    const data = localStorage.getItem(key)
    if (data && data !== 'undefined') {
      return JSON.parse(data)
    }
    return null
  }

  protected setItem(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data)
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  protected removeItem(key: string) {
    localStorage.removeItem(key)
  }

  protected clear() {
    localStorage.clear()
  }

  /////
  protected getSessionStorageItem<T>(key: string): T {
    const data = window.sessionStorage.getItem(key)
    if (data && data !== 'undefined') {
      return JSON.parse(data)
    }
    return null
  }

  protected setSessionStorage(key: string, data: object | string) {
    if (typeof data === 'string') {
      sessionStorage.setItem(key, data)
    }
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  protected removeSessionStorage(key: string) {
    sessionStorage.removeItem(key)
  }

  protected clearSessionStorage() {
    window.sessionStorage.clear()
  }
}
