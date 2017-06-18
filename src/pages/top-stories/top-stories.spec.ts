import { ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestUtils } from '../../test';
import { TopStoriesPage } from './top-stories';
import { ItemsComponent } from '../../components/items/items';
import { ItemComponent } from '../../components/item/item';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { ItemService } from '../../services/ItemService';
import { ItemServiceMock } from '../../testing/ItemServiceMock';

let fixture: ComponentFixture<TopStoriesPage> = null;
let component: any = null;

describe('top stories page', () => {
    
    beforeEach(async(() => TestUtils.beforeEachCompiler(
        [TopStoriesPage, ItemsComponent, ItemComponent, TimeAgoPipe],
        [{ provide: ItemService, useClass: ItemServiceMock }]
    ).then(compiled => {
        fixture = compiled.fixture;
        component = compiled.instance;
    })));

    it('should display a list of 10 items', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let debugElements = fixture.debugElement.queryAll(By.css('h2'));
            expect(debugElements.length).toBe(10);
            expect(debugElements[0].nativeElement.textContent).toContain('Item 1');
            expect(debugElements[1].nativeElement.textContent).toContain('Item 2');
        });
    }));
});