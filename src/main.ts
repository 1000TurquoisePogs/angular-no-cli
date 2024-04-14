// src/main.ts
import "zone.js";
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import * as common from '@angular/common';
import * as core from '@angular/core';

(window as any)['externals'] = {
    ng: {
        common, core
    }
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));