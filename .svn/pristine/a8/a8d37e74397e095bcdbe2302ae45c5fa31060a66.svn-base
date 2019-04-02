import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'; // CUSTOM_ELEMENTS_SCHEMA 不识别ion标签添加这个可以正常使用
import { ThsMapComponent } from './ths-map/ths-map';

import {CommonModule} from '@angular/common'; // CommonModule引入这个模块，ngIf 和ngFor 这些指令就可以用了

@NgModule({
    declarations: [ThsMapComponent],
    imports: [CommonModule],
    exports: [ThsMapComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule { }
