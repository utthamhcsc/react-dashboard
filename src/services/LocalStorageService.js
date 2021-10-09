export class LocalStorageService {
  constructor(name, initialValues) {
    this.data = initialValues;
    this.name = name;
    this.get();
  }
  get() {
    try {
      this.data = JSON.parse(localStorage.getItem(this.name)) || [];
      return this.data;
    } catch (e) {
      return this.data;
    }
  }
  set(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
  }
}
