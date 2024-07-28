export class CarouselActiveItemIndexManager {

    items_count: number;
    active_item_index = 0;

    constructor(items_count: number) {
        this.items_count = items_count;
    }

    next(): number {
        if (this.active_item_index < this.items_count - 1) {
            this.active_item_index++;
        } else {
            this.active_item_index = 0;
        }
        return this.active_item_index;
    }

    previous(): number {
        if (this.active_item_index > 0) {
            this.active_item_index--;
        } else {
            this.active_item_index = this.items_count - 1;
        }
        return this.active_item_index;
    }
}
