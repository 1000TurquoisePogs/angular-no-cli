import {Component} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    // styleUrls: ["app.component.css"]
})
export class AppComponent {
    title = 'Angular no CLI';
    
    async load(): Promise<void> {
        const path = './plugin/app.js';
        const module = await import(/* webpackIgnore: true */ path);
        console.log(`module`, module);
    }
}