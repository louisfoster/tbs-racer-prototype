interface AppInterface {

}

class App implements AppInterface {


    constructor() {

    }

    public static main(): void {

        let app = new App

        console.log('test')
    }
}

App.main()