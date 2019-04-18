type ForceUpdate = () => void;

export abstract class Store<T> {
  /* tslint:disable variable-name */
  private internalState: T;
  private subscribers: ForceUpdate[] = [];
  /* tslint:enable variable-name */
  constructor(initialState: T) {
    this.internalState = initialState;
  }

  get state(): T {
    return this.internalState;
  }

  public __internals_subscribe(forceUpdate: ForceUpdate) {
    this.subscribers.push(forceUpdate);
  }

  // this will force 'actions' to be explicitly defined
  // and won't let setState leak out to the views
  protected setState(update: Partial<T>) {
    Object.assign(this.internalState, update);

    for (const forceUpdate of this.subscribers) {
      forceUpdate();
    }
  }
}
