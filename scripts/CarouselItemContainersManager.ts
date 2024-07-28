import { CarouselItemModel } from "./CarouselItemModel";

export enum CarrouselItemContainerState {
    ACTIVE_ITEM = "carousel-active-item",
    PREV_ITEM = "carousel-prev-item",
    NEXT_ITEM = "carousel-next-item"
}

export class CarouselItemContainersManager {
    transition_speed_ms: number = 350;
    carrousel_id: number;
    active_container_index = 0;
    constructor(carrousel_id: number) {
        this.carrousel_id = carrousel_id;
    }

    initialize(activeContent: CarouselItemModel) {
        const passive_container_index = this.get_passive_container_index();
        this.update_item_container_state(passive_container_index, CarrouselItemContainerState.PREV_ITEM);
        const active_container_index = this.get_active_container_index();
        this.update_item_container_state(active_container_index, CarrouselItemContainerState.ACTIVE_ITEM);
        this.populate_item_container(active_container_index, activeContent);
    }

    next(incomingItemContent: CarouselItemModel) {
        this.animateIncomingItem(incomingItemContent, CarrouselItemContainerState.NEXT_ITEM, CarrouselItemContainerState.PREV_ITEM);
    }

    previous(incomingItemContent: CarouselItemModel) {
        this.animateIncomingItem(incomingItemContent, CarrouselItemContainerState.PREV_ITEM, CarrouselItemContainerState.NEXT_ITEM);
    }

    private animateIncomingItem(incomingItemContent: CarouselItemModel, incoming_item_arrives_from: CarrouselItemContainerState, outgoing_item_arrives_to: CarrouselItemContainerState) {
        const passive_container_index = this.get_passive_container_index();
        const active_container_index = this.get_active_container_index();
        this.active_container_index = passive_container_index; // flip the active and passive
        
        // disable animation
        this.update_animation_style(passive_container_index, true);
        this.update_animation_style(active_container_index, true);
        setTimeout(() => {
            this.populate_item_container(passive_container_index, incomingItemContent);
            this.update_item_container_state(passive_container_index, incoming_item_arrives_from);
            setTimeout(() => {
                // enable animations
                this.update_animation_style(active_container_index, false);
                this.update_animation_style(passive_container_index, false);
                setTimeout(() => {
                    // transition
                    this.update_item_container_state(active_container_index, outgoing_item_arrives_to);
                    this.update_item_container_state(passive_container_index, CarrouselItemContainerState.ACTIVE_ITEM);
                    // disable animations
                    setTimeout(() => {
                        this.update_animation_style(active_container_index, true);
                        this.update_animation_style(passive_container_index, true);
                    }, this.transition_speed_ms);
                }, 40);
            }, 40);
        }, 40)
    }



    private get_active_container_index(): number {
        return this.active_container_index;
    }

    private get_passive_container_index(): number {
        return 1 - this.active_container_index;
    }

    private get_item_container_id(index: number) {
        return "carousel_" + this.carrousel_id + "_item_container_" + index;
    }

    private populate_item_container(index: number, content: CarouselItemModel) {
        //console.log("Populating", index, "with", content);
        const item_container_id = this.get_item_container_id(index);

        const iconHtmlElement = document.getElementById(item_container_id + "_icon");
        if (iconHtmlElement != null) {
            iconHtmlElement!.style.backgroundImage = content.icon;
        }
        const titleHtmlElement = document.getElementById(item_container_id + "_title");
        if (titleHtmlElement !== null) {
            titleHtmlElement!.innerHTML = content.title;
        }
        const contentHtmlElement = document.getElementById(item_container_id + "_content");
        if (contentHtmlElement !== null) {
            contentHtmlElement!.innerHTML = content.content;
        }
    }

    private update_item_container_state(index: number, new_state: CarrouselItemContainerState) {
        const itemContainerHtmlElement = document.getElementById(this.get_item_container_id(index));
        Object.values(CarrouselItemContainerState).forEach((state) => {
            if (state !== new_state) {
                itemContainerHtmlElement?.classList.remove(state);
                return
            }
            itemContainerHtmlElement?.classList.add(state);
        })
    }

    private update_animation_style(index: number, remove: boolean) {
        const itemContainerHtmlElement = document.getElementById(this.get_item_container_id(index));
        if (itemContainerHtmlElement == null) {
            return;
        }
        if (remove) {
            itemContainerHtmlElement.style.transition = "";
            return;
        }
        itemContainerHtmlElement.style.transition = this.transition_speed_ms + "ms";
    }
}

