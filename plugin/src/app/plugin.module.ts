// src/main.ts
import {NgModule} from "@angular/core";
import {PluginComponent} from "./plugin.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    declarations: [PluginComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [PluginComponent]
})
export class PluginModule {}