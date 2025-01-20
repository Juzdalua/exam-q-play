class LocalStorage {
  private static instance: LocalStorage;

  constructor() {}

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  private isClientComponent(): boolean{
    return typeof window != "undefined";
  }

  public setItem(key: string, item: any): void {
    if (this.isClientComponent()) localStorage.setItem(key, item);
  }

  public getItem(key: string): any | null {
    if (this.isClientComponent()) return localStorage.getItem(key);
    return null;
  }

  public removeItem(key: string): void {
    if (this.isClientComponent()) localStorage.removeItem(key);
  }
}

export default LocalStorage;
