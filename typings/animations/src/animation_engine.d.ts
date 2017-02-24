/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer, AnimationTriggerMetadata } from '@angular/animations';
export declare abstract class AnimationEngine {
    abstract registerTrigger(trigger: AnimationTriggerMetadata): void;
    abstract onInsert(element: any, domFn: () => any): void;
    abstract onRemove(element: any, domFn: () => any): void;
    abstract setProperty(element: any, property: string, value: any): void;
    abstract listen(element: any, eventName: string, eventPhase: string, callback: (event: any) => any): () => any;
    abstract flush(): void;
    readonly activePlayers: AnimationPlayer[];
    readonly queuedPlayers: AnimationPlayer[];
}